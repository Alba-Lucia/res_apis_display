import { Request, Response } from "express";
import { Op } from "sequelize";
import ProductCreateForm from "../models/ProductCreateForm.model";
import { searchProducts } from "../data/productCreateForm";
import { validationResult } from "express-validator";

// Crear un nuevo producto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductCreateForm.create(req.body);
    res.status(201).json({ data: product });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear el producto", details: error });
  }
};

// Obtener todos los productos
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductCreateForm.findAll({
      order: [["name", "ASC"]], // 👈 ordena por el campo 'name' en orden ascendente
    });
    res.json({ data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

// Obtener producto por ID
export const getProductsByID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await ProductCreateForm.findByPk(id);

    if (!product) {
      res.status(404).json({ error: "Producto No Encontrado" });
      return;
    }

    res.json({ data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Actualizar producto
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await ProductCreateForm.findByPk(id);

    if (!product) {
      res.status(404).json({ error: "Producto No Encontrado" });
      return;
    }

    await product.update(req.body);
    await product.save();

    res.json({ data: product });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Eliminar producto
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await ProductCreateForm.findByPk(id);

    if (!product) {
      res.status(404).json({ error: "Producto No Encontrado" });
      return;
    }

    await product.destroy();
    res.json({ data: "Producto eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};



export const getSearchProducts = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return 
  }
  const q = req.query.q as string;
  const page = req.query.page ? Number(req.query.page) : 1;
  const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;

  try {
    const { rows, total } = await searchProducts(q, page, pageSize);
    res.json({ data: rows, page, pageSize, total });
    return 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
    return 
  }
};