// src/data/productsRepo.ts
import { Op } from 'sequelize';
import ProductCreateForm from '../models/ProductCreateForm.model';

export async function searchProducts(q: string, page: number, pageSize: number) {
  const offset = (page - 1) * pageSize;

  const { rows, count } = await ProductCreateForm.findAndCountAll({
    where: {
      [Op.or]: [
        { name: { [Op.iLike]: `%${q}%` } },
        { sku: { [Op.iLike]: `%${q}%` } },
      ],
    },
    order: [['name', 'ASC']],
    limit: pageSize,
    offset,
  });

  return { rows, total: count };
}
