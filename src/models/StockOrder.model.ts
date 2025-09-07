import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
} from "sequelize-typescript";

@Table({
  tableName: "stock_orders",
  timestamps: true,
})
class StockOrder extends Model<StockOrder> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING, allowNull: true })
  category?: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING, allowNull: true })
  sku?: string;
}

export default StockOrder;
