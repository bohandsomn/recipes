import { IAddOneWishInput } from './add-one-wish-input.interface'
import { IFindManyWishInput } from './find-many-wish-input.interface'
import { IRemoveOneWishInput } from './remove-one-wish-input.interface'
import { IWishModel } from './wish-model.interface'

export interface IWishService {
    addOne(input: IAddOneWishInput): Promise<string>
    removeOne(input: IRemoveOneWishInput): Promise<string>
    findMany(input: IFindManyWishInput): Promise<IWishModel[]>
}
