type Paths<T> = T extends object
    ? {
        [K in keyof T]-?: K extends string
        ? T[K] extends object
        ? `${K}.${Paths<T[K]>}`
        : `${K}`
        : never
    }[keyof T]
    : never

export interface ITranslate {
    (
        key: Paths<Awaited<typeof import('./constants/i18n/en.json')>>,
        variables?: Record<string, string | number>
    ): string
}
