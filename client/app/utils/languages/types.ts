import { useI18n } from './client'

export interface ITranslate extends ReturnType<typeof useI18n> {
    (key: string, variables: Record<string, string | number>): string
}
