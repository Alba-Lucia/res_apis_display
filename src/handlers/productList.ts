import { Request, Response } from "express";
import ProductCreateForm from "../models/ProductCreateForm.model";
import ProductList from "../models/ProductList.model";
import { literal } from "sequelize";

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await ProductList.findAll({
      include: [{ model: ProductCreateForm, as: "product" }],
      order: [["created_at", "DESC"]],
    });

    console.log("items result:", JSON.stringify(items, null, 2)); // log temporal

    res.json(items);
  } catch (error: any) {
    console.error("Error en getAllItems:", error);
    res
      .status(500)
      .json({ error: error.message || "Error fetching product list" });
  }
};

export const addItem = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId) {
      res.status(400).json({ message: "productId es obligatorio" });
      return;
    }

    const newItem = await ProductList.create({
      productId,
      quantity: quantity,
    });

    res.status(201).json(newItem);
    return;
  } catch (error) {
    console.error("Error al crear item:", error);
    res.status(500).json({ message: "Error interno del servidor" });
    return;
  }
};

// export const updateItem = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const id = req.params.id;
//     const { quantity } = req.body;

//     const item = await ProductList.findByPk(id);

//     if (!item) {
//       res.status(404).json({ error: "Item not found" });
//       return;
//     }

//     await item.update(req.body);
//     // item.quantity = quantity;
//     await item.save();

//     res.json(item);
//     return;
//   } catch (error) {
//     res.status(500).json({ error: "Error updating item" });
//     return;
//   }
// };
// Actualizar producto

export const updateItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { productId, quantity, createdAt, updatedAt } = req.body;

    const product = await ProductList.findByPk(id);

    if (!product) {
      res.status(404).json({ error: "Producto No Encontrado" });
      return;
    }

    if (productId) {
      const exists = await ProductCreateForm.findByPk(productId);
      if (!exists) {
        res.status(400).json({ error: "El productId no existe" });
        return;
      }
    }

    // Preparar campos a actualizar
    const fieldsToUpdate: any = {
      productId,
      quantity,
    };

    // Forzar fecha si es válida
    if (createdAt && !isNaN(Date.parse(createdAt))) {
      fieldsToUpdate.createdAt = literal(
        `'${new Date(createdAt).toISOString()}'`
      );
    }

    if (updatedAt && !isNaN(Date.parse(updatedAt))) {
      fieldsToUpdate.updatedAt = literal(
        `'${new Date(updatedAt).toISOString()}'`
      );
    }

    // Ejecutar actualización directa
    await ProductList.update(fieldsToUpdate, { where: { id } });

    // Recargar producto actualizado
    const updatedProduct = await ProductList.findByPk(id, {
      include: [ProductCreateForm],
    });

    res.json({ data: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const item = await ProductList.findByPk(id);
    if (!item) res.status(404).json({ error: "Item not found" });

    await item.destroy();
    res.json({ message: "Item deleted" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Error deleting item" });
  }
};
