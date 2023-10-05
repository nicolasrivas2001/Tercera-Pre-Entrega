import express from "express";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import viewsProducts from "./routes/products.router.js";
import { Server } from "socket.io";
import { manager } from "../Entrega2.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/api/views", viewsRouter);
app.use("/", viewsProducts);


const httpServer = app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) => {
  
  socket.on("newPrice", (value) => {
    socket.broadcast.emit("priceUpdated", value);
  });

  socket.on("showProducts", async(req,res) => {
    const products = await manager.getProducts({})
    socket.emit("sendProducts", products);
  });

  socket.on("addProduct", async(product) => {
    await manager.addProduct(product.title,product.description,product.price,product.thumbnail,product.code,product.stock)
    const products = await manager.getProducts({})
    socketServer.emit("productUpdated", products);
  });

  socket.on("deleteProduct", async(id) => {
    await manager.deleteProduct(+id)
    const products = await manager.getProducts({})
    socketServer.emit("productUpdated", products);
  });
});