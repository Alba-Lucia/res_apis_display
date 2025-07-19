import { Request, Response } from "express";
import ProductCreateForm from "../models/ProductCreateForm.model";
import ProductList from "../models/ProductList.model";
import { literal } from "sequelize";


export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await ProductList.findAll({
      include: [ProductCreateForm],
      order: [["created_at", "DESC"]],
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const itemsWithExpiredDays = items.map((item: any) => {
      const expirationDate = new Date(item.ProductCreateForm.expirationDate);
      expirationDate.setHours(0, 0, 0, 0);

      const diffTime = today.getTime() - expirationDate.getTime();
      const expiredDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      return {
        ...item.toJSON(),
        expiredDays: expiredDays > 0 ? expiredDays : 0,
      };
    });

    res.json(itemsWithExpiredDays);
  } catch (error) {
    console.error("Error fetching product list:", error);
    res.status(500).json({ error: "Error fetching product list" });
  }
};


/*
export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await ProductList.findAll({
      include: [ProductCreateForm],
      order: [["created_at", "DESC"]],
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product list" });
  }
};
*/
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



export const updateItem = async (req: Request, res: Response): Promise<void> => {
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

    const fieldsToUpdate: any = {};

    if (productId !== undefined) fieldsToUpdate.productId = productId;
    if (quantity !== undefined) fieldsToUpdate.quantity = quantity;

    if (createdAt && !isNaN(Date.parse(createdAt))) {
      fieldsToUpdate.created_at = literal(`'${new Date(createdAt).toISOString()}'`);
    }

    if (updatedAt && !isNaN(Date.parse(updatedAt))) {
      fieldsToUpdate.updated_at = literal(`'${new Date(updatedAt).toISOString()}'`);
    }

    await ProductList.update(fieldsToUpdate, { where: { id } });

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
