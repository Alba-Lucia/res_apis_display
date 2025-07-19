import { body, param } from "express-validator";

export const validateCreateProduct = [
  body("name")
    .notEmpty()
    .withMessage("Product name cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Name must not exceed 100 characters"),
];

export const validateGetbyId = [param("id").isInt().withMessage("ID no valid")];
