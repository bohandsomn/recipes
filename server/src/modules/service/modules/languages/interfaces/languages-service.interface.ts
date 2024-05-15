import { ILanguagesServiceOptions } from './languages-service-options.interface'

export interface ILanguagesService {
    exception(key: string, options?: ILanguagesServiceOptions): string
    getLanguage(): string
}
