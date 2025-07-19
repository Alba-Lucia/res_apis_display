import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsByID,
  updateProduct,
} from "../handlers/productCreateForm";
// import {
//   getProductsInList,
//   updateProductInList,
// } from "../handlers/productsInList";
import { handleInputErrors } from "../middleware";
import {
  validateCreateProduct,
  validateGetbyId,
} from "../validator/productValidator";
import {
  addItem,
  deleteItem,
  getAllItems,
  updateItem,
} from "../handlers/productList";

const router = Router();

router.post("/", validateCreateProduct, handleInputErrors, createProduct);

router.get("/", getProducts);

// Ruta que lista solo productos que están en la listaO
// router.get("/in-list-products", getProductsInList);
// router.put("/in-list-products/:id", updateProductInList);

// Ruta que lista todos
router.get("/", getProducts);

// Ruta por ID
router.get("/:id", validateGetbyId, handleInputErrors, getProductsByID);

router.get("/:id", validateGetbyId, handleInputErrors, getProductsByID);

router.put("/:id", validateCreateProduct, handleInputErrors, updateProduct);

router.delete("/:id", deleteProduct);


export default router;
