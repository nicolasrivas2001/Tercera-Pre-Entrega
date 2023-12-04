import { Router } from "express";
import { usersManager } from "../db/managers/usersManager.js";
import { productsManager } from "../db/managers/productsManager.js";
import { generateToken } from "../utils.js";
import {hashData, compareData} from "../utils.js"
import passport from "passport";

const router = Router()

router.get("/current", passport.authenticate("jwt", {session: false}), async(req,res)=>{
    const user = req.user
    res.json({user})
    
})

router.post("/signup", async(req,res)=>{
    const { first_name, last_name, email, password, rol } = req.body;
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: "Some data is missing" });
    }
    try {
        const hashedPassword = await hashData(password)
        const createdUser = await usersManager.createOne({
            ...req.body,
            password: hashedPassword})
        res.status(200).json({message:"User created", user:createdUser})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.post("/login", async(req,res)=>{
    const { email, password } = req.body;
    if ( !email || !password) {
        return res.status(400).json({ message: "Some data is missing" });
    }
    try {
        const user = await usersManager.findByEmail(email)
        if (!user){
            return res.redirect("/signup")
        }
        
        //const isPasswordValid = password === user.password
        const isPasswordValid = await compareData(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({message:"Password is not valid"})
        }
        //const products = await productsManager.findAll({limit:10, page:1, sort:{}, query:{} })
        //const docs = products.payload.docs
        //res.render("products",{products: docs,user:user.firstName});
        const token = generateToken({email,password});
        res.cookie("token", token, { maxAge: 60000, httpOnly: true }).send("Welcome");
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error})
    }
})

//github

router.get("/auth/github",
    passport.authenticate("github", {scope: ["user.email"]})
)

router.get("/callback",
    passport.authenticate("github"), (req,res)=>{
        res.send("Probando")
    }
)

export default router;

