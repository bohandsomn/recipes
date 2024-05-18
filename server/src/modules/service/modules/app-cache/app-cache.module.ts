import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'

import { CacheRedisService } from './services/cache-redis/cache-redis.service'

@Module({
    imports: [
        CacheModule.register({
            isGlobal: true,
        }),
    ],
    providers: [CacheRedisService],
    exports: [CacheRedisService],
})
export class AppCacheModule {}
