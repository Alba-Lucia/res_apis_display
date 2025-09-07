import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import ProductCreateForm from "./ProductCreateForm.model";

@Table({
  tableName: "product_list",
  timestamps: true, // maneja automáticamente createdAt y updatedAt
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export default class ProductList extends Model {
  @ForeignKey(() => ProductCreateForm)
  @Column({ field: "product_id", type: DataType.INTEGER })
  productId!: number;

  @BelongsTo(() => ProductCreateForm)
  product!: ProductCreateForm;

  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  quantity!: number;

  @Column({ field: "created_at", type: DataType.DATEONLY }) // solo fecha
  declare createdAt?: string; // string por DATEONLY
}
