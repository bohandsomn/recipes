import { ITastyRecipeInstruction } from './tasty-recipe-instruction.interface'
import { ITastyRecipeNutrition } from './tasty-recipe-nutrition.interface'
import { ITastyRecipePrice } from './tasty-recipe-price.interface'
import { ITastyRecipeRating } from './tasty-recipe-rating.interface'
import { ITastyRecipeSection } from './tasty-recipe-section.interface'
import { ITastyRecipeTag } from './tasty-recipe-tag.interface'
import { ITastyRecipeTopic } from './tasty-recipe-topic.interface'

export interface ITastyRecipe {
    readonly approved_at: number | null
    readonly aspect_ratio: string | null
    readonly beauty_url: string | null
    readonly brand: string | null
    readonly brand_id: string | null
    readonly buzz_id: string | null
    readonly canonical_id: string | null
    readonly compilations: ITastyRecipe
    readonly cook_time_minutes: number | null
    readonly country: string | null
    readonly created_at: number | null
    readonly description: string | null
    readonly draft_status: string | null
    readonly facebook_posts: []
    readonly id: number
    readonly inspired_by_url: string | null
    readonly instructions: ITastyRecipeInstruction[]
    readonly is_app_only: boolean | null
    readonly is_one_top: boolean | null
    readonly is_shoppable: boolean | null
    readonly is_subscriber_content: boolean | null
    readonly keywords: string | null
    readonly language: string | null
    readonly name: string | null
    readonly num_servings: number | null
    readonly nutrition: ITastyRecipeNutrition | null
    readonly nutrition_visibility: string | null
    readonly original_video_url: string | null
    readonly prep_time_minutes: number | null
    readonly price: ITastyRecipePrice | null
    readonly promotion: string | null
    readonly sections: ITastyRecipeSection[]
    readonly seo_path: string | null
    readonly seo_title: string | null
    readonly servings_noun_plural: string | null
    readonly servings_noun_singular: string | null
    readonly show_id: number | null
    readonly slug: string | null
    readonly tags: ITastyRecipeTag[]
    readonly thumbnail_alt_text: string | null
    readonly thumbnail_url: string | null
    readonly tips_and_ratings_enabled: true
    readonly topics: ITastyRecipeTopic[]
    readonly total_time_minutes: number | null
    readonly updated_at: number | null
    readonly user_ratings: ITastyRecipeRating | null
    readonly video_ad_content: string | null
    readonly video_id: number | null
    readonly video_url: string | null
    readonly yields: string | null
}
