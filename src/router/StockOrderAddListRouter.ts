import { Router } from "express";
import { addProductHandler, clearTodayListHandler, deleteStockOrderAddToList, getProductListHandler, updateStockOrderAddToList } from "../handlers/StockOrderAddToList";

const stockOrderAddToListRouter = Router();

stockOrderAddToListRouter.post("/", addProductHandler); // ✅ usar directamente
stockOrderAddToListRouter.get("/", getProductListHandler);
stockOrderAddToListRouter.put("/:id", updateStockOrderAddToList);
stockOrderAddToListRouter.delete("/:id", deleteStockOrderAddToList);
stockOrderAddToListRouter.delete("/clear", clearTodayListHandler);


export default stockOrderAddToListRouter;
