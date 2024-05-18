import { Test, TestingModule } from '@nestjs/testing'

import { CacheRedisService } from './cache-redis.service'

describe('CacheRedisService', () => {
    let service: CacheRedisService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CacheRedisService],
        }).compile()

        service = module.get<CacheRedisService>(CacheRedisService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
