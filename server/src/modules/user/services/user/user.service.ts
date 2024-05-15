import {
    ConflictException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { I18nLanguagesService } from '@/modules/service/modules/languages/services/i18n-languages/i18n-languages.service'
import { LoggerService } from '@/modules/service/modules/logger/services/logger/logger.service'

import { ICreateUserInput } from '../../interfaces/create-user-input.interface'
import { IFindOneUserInput } from '../../interfaces/find-one-user-input.interface'
import { IUpdateUserInput } from '../../interfaces/update-user-input.interface'
import { IUserModel } from '../../interfaces/user-model.interface'
import { IUserService } from '../../interfaces/user-service.interface'
import { UserModel } from '../../models/user.model'

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectModel(UserModel)
        private readonly userModel: typeof UserModel,
        private readonly loggerService: LoggerService,
        private readonly languagesService: I18nLanguagesService,
    ) {}

    async create(input: ICreateUserInput): Promise<IUserModel> {
        try {
            const candidate = await this.findOne(input)
            if (candidate) {
                const errorMessage = this.languagesService.exception(
                    'user.create.exists',
                    {
                        arguments: {
                            email: input.email,
                        },
                    },
                )
                throw new ConflictException(errorMessage)
            }
            const user = await this.userModel.create(input)
            return user
        } catch (error) {
            this.loggerService.error(error)
            if (error instanceof HttpException) {
                throw error
            }
            throw new InternalServerErrorException('user.create.unknown')
        }
    }

    async update(input: IUpdateUserInput): Promise<IUserModel> {
        try {
            const user = (await this.getOne(input)) as UserModel
            user.password = input.password ?? user.password
            user.isActive = input.isActive ?? user.isActive
            return user.save()
        } catch (error) {
            this.loggerService.error(error)
            if (error instanceof HttpException) {
                throw error
            }
            throw new InternalServerErrorException('user.update.unknown')
        }
    }

    async findOne(input: IFindOneUserInput): Promise<IUserModel | null> {
        try {
            const conditions: Partial<IUserModel> = {}
            if (input.id) {
                conditions.id = input.id
            }
            if (input.email) {
                conditions.email = input.email
            }
            const candidate = await this.userModel.findOne({
                where: conditions,
            })
            return candidate
        } catch (error) {
            this.loggerService.error(error)
            return null
        }
    }

    async getOne(input: IFindOneUserInput): Promise<IUserModel> {
        const candidate = await this.findOne(input)
        if (!candidate) {
            const errorMessage = this.languagesService.exception(
                'user.get-one.not-found',
            )
            throw new NotFoundException(errorMessage)
        }
        return candidate
    }
}
