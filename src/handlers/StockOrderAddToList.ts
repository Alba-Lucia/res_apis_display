import { Request, Response } from "express";
import StockOrderAddToList from "../models/StockOrderAddToList.model";
import StockOrder from "../models/StockOrder.model";

// export async function addProductHandler(req: Request, res: Response) {
//   try {
//     const { productId, qty } = req.body;

//     if (!productId) {
//       res.status(400).json({ error: "productId is required" });
//       return 
//     }

//     const quantity = Number(qty) || 1;

//     const today = new Date().toISOString().split("T")[0];

//     const existing = await StockOrderAddToList.findOne({
//       where: { productId, listDate: today },
//     });

//     let item, created;

//     if (existing) {
//       item = await existing.update({ quantity: existing.quantity + quantity });
//       created = false;
//     } else {
//       item = await StockOrderAddToList.create({
//         productId,
//         quantity,
//         listDate: today,
//       });
//       created = true;
//     }

//     res.json({
//       id: item.id,
//       productId: item.productId,
//       quantity: item.quantity,
//       listDate: item.listDate,
//       created,
//     });
//   } catch (error) {
//     console.error("Error adding product:", error); // 👈 log detallado
//     res.status(500).json({ error: "Could not add product to the list" });
//   }
// }

export async function addProductHandler(req: Request, res: Response) {
  try {
    const { productId, quantity } = req.body;
    const today = new Date().toISOString().split("T")[0];

    const existing = await StockOrderAddToList.findOne({
      where: { productId, listDate: today },
    });

    let item, created;
    if (existing) {
      item = await existing.update({ quantity: existing.quantity + quantity });
      created = false;
    } else {
      item = await StockOrderAddToList.create({ productId, quantity, listDate: today });
      created = true;
    }

    res.json({ id: item.id, productId: item.productId, quantity: item.quantity, listDate: item.listDate, created });
  } catch (error) {
    res.status(500).json({ error: "Could not add product to the list" });
  }
}

export async function getProductListHandler(req: Request, res: Response) {
  try {
    const today = new Date().toISOString().split("T")[0];

    const items = await StockOrderAddToList.findAll({
      where: { listDate: today }, // solo lista del día
      include: [{ model: StockOrder, attributes: ["id", "name", "category"] }], // 👈 trae el nombre
    });

    res.json(items);
  } catch (error) {
    console.error("Error obteniendo la lista:", error);
    res.status(500).json({ error: "Could not fetch product list" });
  }
}

// Editar producto
export const updateStockOrderAddToList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stockOrderAddToList = await StockOrderAddToList.findByPk(id);
    if (!stockOrderAddToList) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }
    await stockOrderAddToList.update(req.body);
    res.json({ data: stockOrderAddToList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};

// Eliminar producto
export const deleteStockOrderAddToList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await StockOrderAddToList.findByPk(id);

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

export async function clearTodayListHandler(req: Request, res: Response) {
  try {
    const today = new Date().toISOString().split("T")[0];

    const deletedCount = await StockOrderAddToList.destroy({
      where: { listDate: today },
    });

    res.json({
      success: true,
      deleted: deletedCount,
      message: `Se eliminaron ${deletedCount} productos de la lista de hoy`,
    });
  } catch (error) {
    console.error("Error al vaciar lista:", error);
    res.status(500).json({ error: "No se pudo vaciar la lista" });
  }
}

