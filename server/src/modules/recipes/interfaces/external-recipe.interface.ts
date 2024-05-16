import { IExternalRecipeIngredient } from './external-recipe-ingredient.interface'
import { IExternalRecipeStage } from './external-recipe-stage.interface'

export interface IExternalRecipe {
    /**
     * @example "TASTY_12345678"
     * @description TASTY is enum `ExternalRecipe` and `recipeId` is external identifier ("ExternalRecipe_recipeId")
     * @unique
     */
    readonly recipeCredentials: string
    /**
     * @example "How To Make Classic French Toast"
     */
    readonly name: string | null
    /**
     * @example "This iconic dish is all about the details. While french toast might seem simple, looks can be deceiving. To get that perfectly crispy exterior and creamy, silky custard on the inside we spent weeks eating tons of butter, bread, and syrup to discover the best classic french toast recipe. The end result is indulgent, delicious, and most importantly, easy to make. What’s not to love?"
     */
    readonly description: string | null
    /**
     * @example "One, two, three, four, five"
     */
    readonly keywords: string | null
    /**
     * @example 1920
     * @description `price.total_price` from external api
     */
    readonly price: number | null
    /**
     * @example 20
     * @description `total_time_minutes` from external api
     */
    readonly time: number | null
    /**
     * @example "https://s3.amazonaws.com/video-api-prod/assets/42109c902ae449bda59cebafa04745ca/BFV81893_FrenchToast_ADB_090821_Final_16x9_YT.mp4"
     * @description `original_video_url` from external api
     */
    readonly video: string | null
    /**
     * @example "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/341495.jpg"
     * @description `thumbnail_url` from external api
     */
    readonly image: string | null
    /**
     * @description `nutrition.calories` from external ap
     */
    readonly calories: number | null
    /**
     * @description `nutrition.carbohydrate` from external api
     */
    readonly carbohydrate: number | null
    /**
     * @description `nutrition.fat` from external api
     */
    readonly fat: number | null
    /**
     * @description `nutrition.fiber` from external api
     */
    readonly fiber: number | null
    /**
     * @description `nutrition.protein` from external api
     */
    readonly protein: number | null
    /**
     * @description `nutrition.sugar` from external api
     */
    readonly sugar: number | null
    /**
     * @example 0.612523452
     * @description `user_rating.count_pos` and `user_rating.count_neg` from external api. Rating = Positive / (Positive + Negative)
     */
    readonly rating: number | null
    /**
     * @description `topic.display_name` from external api
     */
    readonly topics: string[] | null
    /**
     * @description `tag.display_name` from external api
     */
    readonly tags: string[] | null
    readonly stages: IExternalRecipeStage[] | null
    readonly ingredients: IExternalRecipeIngredient[] | null
}
