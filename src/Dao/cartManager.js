import fs from "fs";

export class CartManager {
    #path = "";
    constructor(rutaArchivoCart) {
        this.#path = rutaArchivoCart;
        this.idInicial = 1;
    }

    async createCart() {
        const carts = await this.getCarts();
        const newCart = {
            id: this.idInicial,
            products: []
        };
        carts.push(newCart);
        this.idInicial++;
        await this.saveCarts(carts);
        return newCart;
    }

    async addProductToCart(cartId, product) {
        const carts = await this.getCarts();
        const cart = carts.find((c) => c.id === cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }
        cart.products.push(product);
        await this.saveCarts(carts);
    }

    async getCarts() {
        try {
            const data = await fs.readFile(this.#path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.log("Error leyendo el archivo:", error);
            return [];
        }
    }

    async saveCarts(carts) {
        await fs.writeFile(this.#path, JSON.stringify(carts, null, 2));
    }
}

// module.exports = { CartManager };
