import { IAddOneWish } from './add-one-wish.interface'
import { IRemoveOneWish } from './remove-one-wish.interface'

export interface IWishService {
    addOne(input: IAddOneWish): Promise<string>
    removeOne(input: IRemoveOneWish): Promise<string>
}
