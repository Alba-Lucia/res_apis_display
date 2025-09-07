import { Router } from "express";
import { createProduct, deleteProduct, getStockOrders, updateProduct } from "../handlers/stockOrderHandlers";

const stockOrderRouter = Router();
stockOrderRouter.post("/", createProduct);
stockOrderRouter.get("/", getStockOrders);
stockOrderRouter.delete("/:id", deleteProduct);
stockOrderRouter.put("/:id", updateProduct);

export default stockOrderRouter;
