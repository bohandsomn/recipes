export interface ITastyRecipeComponent {
    readonly extra_comment: string | null
    readonly id: number | null
    readonly ingredient: {
        created_at: number | null
        display_plural: string | null
        display_singular: string | null
        id: number | null
        name: string | null
        updated_at: number | null
    }
    readonly measurements: {
        id: number | null
        quantity: string | null
        unit: {
            abbreviation: string | null
            display_plural: string | null
            display_singular: string | null
            name: string | null
            system: string | null
        }
    }[]
    readonly position: number | null
    readonly raw_text: string | null
}
