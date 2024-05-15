import {
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
    @PrimaryKey
    @Column
    id: number

    @Unique
    @Column(DataType.CHAR)
    email: string

    @Default(null)
    @Column(DataType.CHAR)
    password: string | null

    @Default(false)
    @Column(DataType.BOOLEAN)
    isActive: boolean

    @Column(DataType.UUIDV4)
    activationLink: string
}
