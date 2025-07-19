import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
  tableName: "products",
  timestamps: true,
})
class ProductCreateForm extends Model<ProductCreateForm> {
  @Column({
    type: DataType.STRING,
    allowNull: false, // ← Solo este es obligatorio
  })
  name!: string;
  @Column({
    type: DataType.INTEGER,
    allowNull: true, // ← Ahora opcional
  })
  quantity?: number;

  // @Column({
  //   type: DataType.STRING,
  //   allowNull: true, // ← Ahora opcional
  // })
  // idProductList?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true, // ← Ahora opcional
  })
  unit?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true, // ← Ahora opcional
  })
  expirationDate?: Date;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  addedToday?: boolean;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  inList?: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  statusLabel?: string;
}

export default ProductCreateForm;
