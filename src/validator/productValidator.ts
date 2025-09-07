import { body, param, query } from "express-validator";

export const validateCreateProduct = [
  body("name")
    .notEmpty()
    .withMessage("Product name cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Name must not exceed 100 characters"),
];

export const validateGetbyId = [param("id").isInt().withMessage("ID no valid")];



export const productQueryValidator = [
  query('q')
    .trim()
    .notEmpty()
    .withMessage('El parámetro q es requerido'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('page debe ser un número entero positivo')
    .toInt(),
  query('pageSize')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('pageSize debe ser un número entre 1 y 50')
    .toInt(),
];
