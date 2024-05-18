import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import * as cookieParser from 'cookie-parser'

import { Environment } from '@/modules/service/modules/app-config/constants/environment'
import { AppConfigService } from '@/modules/service/modules/app-config/services/app-config/app-config.service'

import { AppModule } from './app.module'
import { AppExceptionFilter } from './filters/app-exception/app-exception.filter'

async function bootstrap() {
    const appConfigService = new AppConfigService(new ConfigService())
    const port = parseInt(appConfigService.get(Environment.PORT))
    const corsOrigin = appConfigService.get(Environment.CORS_ORIGIN)
    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn'],
    })
    const appExceptionFilter = app.get(AppExceptionFilter)
    app.use(cookieParser())
    app.enableCors({
        origin: corsOrigin,
        credentials: true,
    })
    app.useGlobalFilters(appExceptionFilter)
    await app.listen(port, () =>
        console.log(`Server has started on port ${port}`),
    )
}
bootstrap()
