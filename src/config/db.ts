import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import ProductList from '../models/ProductList.model';
import ProductCreateForm from '../models/ProductCreateForm.model';
dotenv.config()

// console.log(process.env.DATABASE_URL)

const db = new Sequelize(process.env.DATABASE_URL!, {
    logging: false,
    models: [ProductList, ProductCreateForm], // <- ¡IMPORTANTE!
})

export default db