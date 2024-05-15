import { ICreateUserInput } from './create-user-input.interface'
import { IFindOneUserInput } from './find-one-user-input.interface'
import { IUpdateUserInput } from './update-user-input.interface'
import { IUserModel } from './user-model.interface'

export interface IUserService {
    create(input: ICreateUserInput): Promise<IUserModel>
    update(input: IUpdateUserInput): Promise<IUserModel>
    findOne(input: IFindOneUserInput): Promise<IUserModel | null>
    getOne(input: IFindOneUserInput): Promise<IUserModel>
}
