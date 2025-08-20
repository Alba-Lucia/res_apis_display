import { Request, Response } from "express";
import { Op } from "sequelize";
import ProductCreateForm from "../models/ProductCreateForm.model";

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

// // Obtener productos por estado de vencimiento
// export const getProductsByStatus = async (_req: Request, res: Response) => {
//   try {
//     const today = new Date();
//     const tomorrow = new Date();
//     tomorrow.setDate(today.getDate() + 1);
//     const products = await Product.findAll({
//       where: {
//         expirationDate: {
//           [Op.lte]: tomorrow,
//         },
//       },
//     });

//     res.json({ data: products });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error al obtener productos por estado" });
//   }
// };

// // Obtener productos vencidos
// export const getExpiredProducts = async (_req: Request, res: Response) => {
//   try {
//     const today = new Date();
//     const products = await Product.findAll({
//       where: {
//         expirationDate: {
//           [Op.lt]: today,
//         },
//       },
//     });

//     res.json({ data: products });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error al obtener productos vencidos" });
//   }
// };

// // Obtener productos agregados hoy
// export const getTodayProducts = async (_req: Request, res: Response) => {
//   try {
//     const startOfDay = new Date();
//     startOfDay.setHours(0, 0, 0, 0);
//     const endOfDay = new Date();
//     endOfDay.setHours(23, 59, 59, 999);

//     const products = await Product.findAll({
//       where: {
//         createdAt: {
//           [Op.between]: [startOfDay, endOfDay],
//         },
//       },
//     });

//     res.json({ data: products });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error al obtener productos de hoy" });
//   }
// };

// // Agregar producto a la lista del día
// export const addToList = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findByPk(id);

//     if (!product) {
//       res.status(404).json({ error: "Producto no encontrado" });
//       return;
//     }

//     product.inList = true;
//     await product.save();

//     res.json({ data: product });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error al agregar a la lista" });
//   }
// };

// // Quitar producto de la lista del día
// export const removeFromList = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findByPk(id);

//     if (!product) {
//       res.status(404).json({ error: "Producto no encontrado" });
//       return;
//     }

//     product.inList = false;
//     await product.save();

//     res.json({ data: product });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error al quitar de la lista" });
//   }
// };
