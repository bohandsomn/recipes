export interface ISearchRecipesService {
    search(query: string): Promise<string[]>
}
