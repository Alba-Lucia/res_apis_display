import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsByID,
  getSearchProducts,
  updateProduct,
} from "../handlers/productCreateForm";

import { handleInputErrors } from "../middleware";
import {
  productQueryValidator,
  validateCreateProduct,
  validateGetbyId,
} from "../validator/productValidator";

const router = Router();

router.post("/", validateCreateProduct, handleInputErrors, createProduct);

router.get("/", getProducts);

// Ruta que lista todos
router.get("/", getProducts);

// Ruta por ID
router.get("/:id", validateGetbyId, handleInputErrors, getProductsByID);

router.get("/:id", validateGetbyId, handleInputErrors, getProductsByID);

router.put("/:id", validateCreateProduct, handleInputErrors, updateProduct);

router.delete("/:id", deleteProduct);

router.get('/searchProducts', productQueryValidator, getSearchProducts);

export default router;
