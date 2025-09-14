import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import ProductList from '../models/ProductList.model';
import ProductCreateForm from '../models/ProductCreateForm.model';
import StockOrder from '../models/StockOrder.model';
import StockOrderAddToList from '../models/StockOrderAddToList.model';
dotenv.config()

// console.log(process.env.DATABASE_URL)

const db = new Sequelize(process.env.DATABASE_URL!, {
    logging: false,
    models: [ProductList, ProductCreateForm, StockOrder, StockOrderAddToList], // <- ¡IMPORTANTE!
})

export default db