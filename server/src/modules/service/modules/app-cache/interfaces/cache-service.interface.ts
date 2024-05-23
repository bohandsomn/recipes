export interface ICacheService<Value = unknown> {
    save<V = Value>(key: string, value: V, ttl: number): Promise<void>
    get<V = Value>(key: string): Promise<V | null>
    delete(key: string): Promise<void>
}
