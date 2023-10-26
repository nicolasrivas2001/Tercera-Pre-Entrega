import fs from "fs"
class cartManager{

    constructor(path){
        this.cart=[]
        this.path=path
    }

    async getCarts(){
        try {
            if(fs.existsSync(this.path)){
                const cartFile = await fs.promises.readFile(this.path,"utf-8")
                return JSON.parse(cartFile)
            }else{
                return []
            }
        } catch (error) {
            return error
        }
    }

    async addCart(){
        try {
            const cartFile = await this.getCarts()
            let id
            if(cartFile.length===0){
                id=1
            }else{
                id=cartFile[cartFile.length-1].id+1
            }
            cartFile.push({id:id,products:[]})
            await fs.promises.writeFile(this.path,JSON.stringify(cartFile))
        } catch (error) {
            return error
        }
        
    }

    async getCartbyId(id){
        try {
            const cartFile = await this.getCarts()
            let cart = cartFile.find(p=>p.id===id);
            if(!cart){
                console.log("Not found")
            }else{
                return cart.products
            }
        } catch (error) {
            return error
        }
    }

    async addQuantity(cid,pid){
        try {
            const cartFile = await this.getCarts()
            let cart = cartFile.findIndex(p=>p.id===cid);
            if(cart<0){
                console.log("Carrito no encontrado")
                console.log(cart);
            }else{
                const productIndex = cartFile[cart].products.findIndex(p=>p.product===pid)
                if(productIndex<0){
                    const newProduct = {"product":pid,"quantity":1}
                    cartFile[cart].products.push(newProduct)
                }else{
                    cartFile[cart].products[productIndex].quantity=cartFile[cart].products[productIndex].quantity+1
                }
                fs.promises.writeFile(this.path,JSON.stringify(cartFile))
            }
        } catch (error) {
            return error
        }
    }


}



async function test(){
    const cart=new cartManager("carrito.json")
    /*
    await cart.addQuantity(3,1)
    await manager.addProduct("Buzo","desc",900,"thumb",19,11,true,"Ropa")
    await manager.addProduct("Fideos","desc",900,"thumb",10,11)
    await manager.addProduct("Leche","desc",900,"thumb",11,11)
    await manager.addProduct("Calabaza","desc",900,"thumb",12,11)
    await manager.addProduct("Chocolate","desc",900,"thumb",13,11)
    await manager.updateProduct(3,{price:500})
    return manager
    await manager.addProduct({"Remera","desc",900,"thumb",17,11,true,"Ropa"})*/
}


test()

export const cart=new cartManager("carrito.json")
