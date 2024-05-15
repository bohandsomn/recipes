import { NestFactory } from '@nestjs/core'

import { Environment } from '@/modules/service/modules/app-config/constants/environment'
import { AppConfigService } from '@/modules/service/modules/app-config/services/app-config/app-config.service'

import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const appConfig = app.get(AppConfigService)
    const port = parseInt(appConfig.get(Environment.PORT))
    await app.listen(port, () =>
        console.log(`Server has started on port ${port}`),
    )
}
bootstrap()
