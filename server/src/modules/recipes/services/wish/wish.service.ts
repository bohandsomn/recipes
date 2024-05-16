import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { IWishService } from '../../interfaces/wish-service.interface'
import { InjectModel } from '@nestjs/sequelize'
import { WishModel } from '../../models/wish.model'
import { LoggerService } from '@/modules/service/modules/logger/services/logger/logger.service'
import { I18nLanguagesService } from '@/modules/service/modules/languages/services/i18n-languages/i18n-languages.service'
import { IAddOneWish } from '../../interfaces/add-one-wish.interface'
import { IRemoveOneWish } from '../../interfaces/remove-one-wish.interface'

@Injectable()
export class WishService implements IWishService {
    constructor(
        @InjectModel(WishModel)
        private readonly wishModel: typeof WishModel,
        private readonly loggerService: LoggerService,
        private readonly languagesService: I18nLanguagesService,
    ) { }

    async addOne(input: IAddOneWish): Promise<string> {
        try {
            const [wish] = await this.wishModel.findOrCreate({
                where: {
                    userId: input.userId,
                    recipeCredentials: input.recipeCredentials,
                }
            })
            return wish.recipeCredentials
        } catch (error) {
            this.loggerService.error(error)
            const errorMessage = this.languagesService.exception('wish.add-one.unknown')
            throw new InternalServerErrorException(errorMessage)
        }
    }

    async removeOne(input: IRemoveOneWish): Promise<string> {
        try {
            await this.wishModel.destroy({
                where: {
                    userId: input.userId,
                    recipeCredentials: input.recipeCredentials,
                }
            })
            return input.recipeCredentials
        } catch (error) {
            this.loggerService.error(error)
            const errorMessage = this.languagesService.exception('wish.remove-one.unknown')
            throw new InternalServerErrorException(errorMessage)
        }
    }
}
