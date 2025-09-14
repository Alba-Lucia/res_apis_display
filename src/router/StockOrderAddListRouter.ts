import { Router } from "express";
import { addProductHandler, clearTodayListHandler, getProductListHandler } from "../handlers/StockOrderAddToList";

const stockOrderAddToListRouter = Router();

stockOrderAddToListRouter.post("/", addProductHandler); // ✅ usar directamente
stockOrderAddToListRouter.get("/", getProductListHandler);
stockOrderAddToListRouter.delete("/clear", clearTodayListHandler);


export default stockOrderAddToListRouter;
