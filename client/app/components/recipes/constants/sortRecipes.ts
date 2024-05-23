export enum SortRecipes {
    POPULAR = '',
    ASCENDING = 'approved_at:asc',
    DESCENDING = 'approved_at:desc',
}

export const sortRecipesValues = Object.values(SortRecipes)
