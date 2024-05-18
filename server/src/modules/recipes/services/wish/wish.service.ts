import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { I18nLanguagesService } from '@/modules/service/modules/languages/services/i18n-languages/i18n-languages.service'
import { LoggerService } from '@/modules/service/modules/logger/services/logger/logger.service'

import { IAddOneWishInput } from '../../interfaces/add-one-wish-input.interface'
import { IFindManyWishInput } from '../../interfaces/find-many-wish-input.interface'
import { IRemoveOneWishInput } from '../../interfaces/remove-one-wish-input.interface'
import { IWishModel } from '../../interfaces/wish-model.interface'
import { IWishService } from '../../interfaces/wish-service.interface'
import { WishModel } from '../../models/wish.model'

@Injectable()
export class WishService implements IWishService {
    constructor(
        @InjectModel(WishModel)
        private readonly wishModel: typeof WishModel,
        private readonly loggerService: LoggerService,
        private readonly languagesService: I18nLanguagesService,
    ) {}

    async addOne(input: IAddOneWishInput): Promise<string> {
        try {
            const [wish] = await this.wishModel.findOrCreate({
                where: {
                    userId: input.userId,
                    recipeCredentials: input.recipeCredentials,
                },
            })
            return wish.recipeCredentials
        } catch (error) {
            this.loggerService.error(error)
            const errorMessage = this.languagesService.exception(
                'wish.add-one.unknown',
            )
            throw new InternalServerErrorException(errorMessage)
        }
    }

    async removeOne(input: IRemoveOneWishInput): Promise<string> {
        try {
            await this.wishModel.destroy({
                where: {
                    userId: input.userId,
                    recipeCredentials: input.recipeCredentials,
                },
            })
            return input.recipeCredentials
        } catch (error) {
            this.loggerService.error(error)
            const errorMessage = this.languagesService.exception(
                'wish.remove-one.unknown',
            )
            throw new InternalServerErrorException(errorMessage)
        }
    }

    async findMany(input: IFindManyWishInput): Promise<IWishModel[]> {
        try {
            const wishes = await this.wishModel.findAll({
                where: {
                    userId: input.userId,
                },
            })
            return wishes
        } catch (error) {
            this.loggerService.error(error)
            const errorMessage = this.languagesService.exception(
                'wish.find-many.unknown',
            )
            throw new InternalServerErrorException(errorMessage)
        }
    }
}
