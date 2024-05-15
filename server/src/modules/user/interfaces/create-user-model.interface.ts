import { IUserModel } from './user-model.interface'

export interface ICreateUserModel extends Pick<IUserModel, 'email'> {}
