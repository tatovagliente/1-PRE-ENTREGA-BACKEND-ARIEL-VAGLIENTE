const express = require ("express");
const { ProductManager} = require("./Dao/ProductManager");
const { CartManager } = require("./Dao/cartManager");


const PORT = 8080

const productManager = new ProductManager ("./src/Data/products.json")
const cartManager= new CartManager ("./src/Data/carts.json")

const app = express()

app.get("/", (req, res)=>{
    res.send(`Server up en puerto ${PORT} con express (no mas HTTP)`)
})

app.get("/contacto", (req, res)=>{
    console.log(req.url)
    res.send(`CONTACTO`)
})

app.get("/products", async (req, res)=>{
    try{
        let products = await productManager.getProducts()
        console.log(products)
    res.send(products)
    } catch (error){
        res.send(`Error interno del Server!`)
    }
    
})

app.get("/carts", async (req, res)=>{
    try{
        let cart = await cartManager.getCarts()

    res.send(cart)
    } catch (error){
        res.send(`Error interno del Server!`)
    }
    
})


app.listen(PORT, ()=>{
    console.log(`Server up en puerto ${PORT} con Express`)
})