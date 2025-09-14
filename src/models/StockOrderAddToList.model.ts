import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import StockOrder from "./StockOrder.model";

@Table({
  tableName: "product_stock_list",
  timestamps: false, // maneja automáticamente createdAt y updatedAt
})
export default class StockOrderAddToList extends Model {
  @ForeignKey(() => StockOrder)
  @Column({ field: "product_id", type: DataType.INTEGER })
  productId!: number;

  @BelongsTo(() => StockOrder)
  stockOrder?: StockOrder;

  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  quantity?: number;

  @Column({ type: DataType.DATEONLY })
  listDate?: string;
}
