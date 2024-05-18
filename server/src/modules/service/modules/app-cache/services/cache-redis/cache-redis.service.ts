import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'

import { Cache } from 'cache-manager'

import { Environment } from '../../../app-config/constants/environment'
import { AppConfigService } from '../../../app-config/services/app-config/app-config.service'
import { ICacheService } from '../../interfaces/cache-service.interface'

@Injectable()
export class CacheRedisService<Value = unknown>
    implements ICacheService<Value>
{
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
        private readonly appConfigService: AppConfigService,
    ) {}

    async save<V = Value>(
        key: string,
        value: V,
        ttl = parseInt(this.appConfigService.get(Environment.CACHING_TTL)),
    ): Promise<void> {
        await this.cacheManager.set(key, value, ttl)
    }

    async get<V = Value>(key: string): Promise<V | null> {
        const value = (await this.cacheManager.get<V>(key)) ?? null
        return value
    }

    async delete(key: string): Promise<void> {
        await this.cacheManager.del(key)
    }
}
