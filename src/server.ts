import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import authRouter from "./router/router";
import productRouter from "./router/router";
import showcaseRouter from "./router/router";
import productListRoutes from "./router/productList";
import stockOrderRouter from "./router/stockOrderRouter";

import db from "./config/db";
import morgan from "morgan";
import stockOrderAddToListRouter from "./router/StockOrderAddListRouter";

//Conectar a la abse de datos
async function conectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.blue.bold("Conectado exitosa a la base de datos"));
  } catch (error) {
    console.log(error);
    console.log(colors.red("Hubo un error al conectar a la base de datos"));
  }
}

conectDB();
const server = express();

const corsOptions: CorsOptions = {
  origen: function (origen, callback) {
    if (origen === process.env.FRONTEND_URL) {
      callback(null, true);
      console.log("permitir");
    } else {
      console.log("Denegar");
    }
  },
};

server.use(cors(corsOptions));

// Leer datos de formulario
server.use(express.json());

server.use(morgan("dev"));

server.use("/api/auth", authRouter); // Para login y registro
server.use("/api/products", productRouter); // Para productos del inventario
server.use("/api/product-list", productListRoutes);
server.use("/api/showcase", showcaseRouter); // Para productos en la vitrina
server.use("/api/stockOrder", stockOrderRouter);
server.use("/api/stockOrderList", stockOrderAddToListRouter);

export default server;
