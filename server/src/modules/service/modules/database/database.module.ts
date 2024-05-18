import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { AppConfigService } from '@/service/modules/app-config/services/app-config/app-config.service'

import { Environment } from '../app-config/constants/environment'

@Module({
    imports: [
        SequelizeModule.forRootAsync({
            useFactory(appConfigService: AppConfigService) {
                const databaseUrl = appConfigService.get(
                    Environment.POSTGRES_URL,
                )
                const matches = databaseUrl.match(
                    /([^:]+):\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/,
                )
                if (!matches || matches.length < 7) {
                    throw new Error(`Invalid URL format: ${databaseUrl}`)
                }
                const [
                    ,
                    protocol,
                    username,
                    password,
                    host,
                    portString,
                    database,
                ] = matches
                const port = parseInt(portString)
                return {
                    protocol,
                    username,
                    password,
                    host,
                    port,
                    database,
                    dialect: 'postgres',
                    synchronize: true,
                    autoLoadModels: true,
                    logging: false,
                }
            },
            inject: [AppConfigService],
        }),
    ],
})
export class DatabaseModule {}
