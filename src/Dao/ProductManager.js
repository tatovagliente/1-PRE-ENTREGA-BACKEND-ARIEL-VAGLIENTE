const fs = require('fs').promises;

//let rutaArchivo = "./src/Data/products.json";

class ProductManager {

    #path="";
    constructor(rutaArchivo) {
        this.#path = rutaArchivo; 
        this.idInicial = 1;
    }

    async addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;

        
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        const products = await this.getProducts();

        
        const codeExiste = products.some((p) => p.code === code);
        if (codeExiste) {
            console.log(`El producto con el código ${code} ya existe`);
            return;
        }

        
        const newProduct = {
            id: this.idInicial,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        products.push(newProduct);
        this.idInicial++;

        
        await this.saveProducts(products);
    }

    
    async getProducts() {
        try {
            console.log("Leyendo desde el archivo:", this.#path);
            const data = await fs.readFile(this.#path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.log("Error leyendo el archivo:", error);
            return [];
        }
    }

    
    async saveProducts(products) {
        await fs.writeFile(this.#path, JSON.stringify(products, null, 2));
    }

    
    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find((p) => p.id === id);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        return product;
    }
}

module.exports={ProductManager}