import {
    AutoIncrement,
    Column,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table,
    Unique,
} from 'sequelize-typescript'

import { ICreateUserModel } from '../interfaces/create-user-model.interface'
import { IUserModel } from '../interfaces/user-model.interface'

@Table
export class UserModel
    extends Model<IUserModel, ICreateUserModel>
    implements IUserModel
{
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number

    @Unique
    @Column(DataType.STRING)
    email: string

    @Default(null)
    @Column(DataType.STRING)
    password: string | null

    @Default(false)
    @Column(DataType.BOOLEAN)
    isActive: boolean

    @Column(DataType.STRING)
    activationLink: string
}
