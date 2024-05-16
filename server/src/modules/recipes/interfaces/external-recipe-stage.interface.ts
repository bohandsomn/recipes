/**
 * @description `instruction` from external api
 */
export interface IExternalRecipeStage {
    /**
     * @description `id` from external api
     * @unique
     */
    readonly id: number
    /**
     * @description `text` from external api
     */
    readonly name: string | null
    /**
     * @description `start_time` and `end_time` from external api. Time = End time - Start time
     */
    readonly time: number | null
}
