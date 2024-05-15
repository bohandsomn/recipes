import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
    // TODO: Get this value from env (app config service)
    const port = parseInt(process.env.PORT ?? '4000')
    const app = await NestFactory.create(AppModule)
    await app.listen(port, () =>
        console.log(`Server has started on port ${port}`),
    )
}
bootstrap()
