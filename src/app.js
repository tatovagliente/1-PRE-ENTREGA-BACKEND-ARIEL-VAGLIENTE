const express = require ("express");
const { ProductManager} = require("./Dao/ProductManager");


const PORT = 8080

const productManager = new ProductManager ()

const app = express()

app.get("/", (req, res)=>{
    res.send(`Server up en puerto ${PORT} con express (no mas HTTP)`)
})

app.get("/contacto", (req, res)=>{
    console.log(req.url)
    res.send(`CONTACTO`)
})

app.get("/products", async (req, res)=>{

    let products = await productManager.getProducts("./src/Data/products.json")

    res.send(products)
})

app.listen(PORT, ()=>{
    console.log(`Server up en puerto ${PORT} con Express`)
})