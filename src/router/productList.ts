import { Router } from "express";
import {
    addItem,
    deleteItem,
    getAllItems,
    updateItem,
} from "../handlers/productList";

const router = Router();

router.get("/", getAllItems);
router.post("/", addItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
