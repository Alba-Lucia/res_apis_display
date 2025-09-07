import { Request, Response } from "express";
import StockOrder from "../models/StockOrder.model";

// Crear un nuevo producto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const stockOrders = await StockOrder.create(req.body);
    res.status(201).json({ data: stockOrders });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear el producto", details: error });
  }
};

// Obtener todos los productos
export const getStockOrders = async (req: Request, res: Response) => {
  try {
    const stockOrders = await StockOrder.findAll({
      order: [["name", "ASC"]],
    });
    res.json({ data: stockOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

// Editar producto
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stockOrder = await StockOrder.findByPk(id);
    if (!stockOrder) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }
    await stockOrder.update(req.body);
    res.json({ data: stockOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};

// Eliminar producto
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await StockOrder.findByPk(id);

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
