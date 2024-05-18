import {
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'

import { ICreateWishModel } from '../interfaces/create-wish-model.interface'
import { IWishModel } from '../interfaces/wish-model.interface'

@Table
export class WishModel
    extends Model<IWishModel, ICreateWishModel>
    implements IWishModel
{
    @AutoIncrement
    @PrimaryKey
    @Column({ type: DataType.INTEGER })
    id: number

    @Column({ type: DataType.INTEGER })
    userId: number

    @Column({ type: DataType.STRING })
    recipeCredentials: string
}
