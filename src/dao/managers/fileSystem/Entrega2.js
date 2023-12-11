import fs from "fs"
class ProductManager{

    constructor(path){
        this.products=[]
        this.path=path
    }

    async getProducts(queryObj){
        const {limit} = queryObj
        try {
            if(fs.existsSync(this.path)){
                const productsFile=await fs.promises.readFile(this.path,"utf-8")
                const productsData = JSON.parse(productsFile)
                return limit? productsData.slice(0,+limit): productsData
            }else{
                return []
            }
        } catch (error) {
            return error
        }
    }

    async addProduct(title,description,price,thumbnail,code,stock){
        try {
            const productsFile = await this.getProducts({})
            if(!title || !description || !price || !thumbnail || !code || !stock){
                console.log("Debe ingresar todos los datos: title,description,price,thumbnail,code,stock")
            }else{
                const codigo=productsFile.find(p=>p.code===code)
                if(codigo){
                    console.log("El codigo de este producto ya existe")
                }else{
                    let id
                    if(productsFile.length===0){
                        id=1
                    }else{
                        id=productsFile[productsFile.length-1].id+1
                    }
                    productsFile.push({title,description,price,thumbnail,code,id,stock})
                    await fs.promises.writeFile(this.path,JSON.stringify(productsFile))
                }
            }
        } catch (error) {
            return error
        }
        
    }

    async getProductById(id){
        try {
            const productsFile=await this.getProducts({})
            let product = productsFile.find(p=>p.id===id);
            if(!product){
                console.log("Not found")
            }else{
                return product
            }
        } catch (error) {
            return error
        }
    }

    async deleteProduct(id){
        try {
            const productsFile=await this.getProducts({})
            const newArray=productsFile.filter(p=>p.id!==id)
            fs.promises.writeFile(this.path,JSON.stringify(newArray))
            return productsFile
        } catch (error) {
            return error
        }
    }

    async updateProduct(id,data){
        try {
            const productsFile=await this.getProducts({})
            const product=productsFile.findIndex(p=>p.id===id)
            if(product<0){
                console.log("Elemento no encontrado")
            }else{
                const productUpdated=Object.assign(productsFile[product],data)
                productsFile[product]=productUpdated
                fs.promises.writeFile(this.path,JSON.stringify(productsFile))
            }
        } catch (error) {
            return error
        }
    }
}




async function test(){
    const manager=new ProductManager("productos.json")
    /*
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

export const manager=new ProductManager("productos.json")