import express from 'express';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';

const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);


app.listen(PORT, () => {
    console.log(`Server up en puerto ${PORT} con Express`);
});
