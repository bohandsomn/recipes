import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { SortRecipes } from '../../constants/sort-recipes'
import { RecipeDto } from '../../dtos/recipe-dto'
import { RecipeListDto } from '../../dtos/recipe-list-dto'
import { IRecipesResolver } from '../../interfaces/recipes-resolver.interface'
import { RecipesService } from '../../services/recipes/recipes.service'

@Resolver()
export class RecipesResolver implements IRecipesResolver {
    constructor(private readonly recipesService: RecipesService) {}

    @Query(() => RecipeListDto)
    async getRecipeList(
        @Args('page') page: number,
        @Args('size') size: number,
        @Args('query') query: string,
        @Args('sort') sort: SortRecipes,
    ): Promise<RecipeListDto> {
        return this.recipesService.getRecipeList({
            page,
            size,
            query,
            sort,
        })
    }

    @Query(() => RecipeDto)
    async getRecipe(
        @Args('recipeCredentials') recipeCredentials: string,
    ): Promise<RecipeDto> {
        return this.recipesService.getRecipe({
            recipeCredentials,
        })
    }

    @Query(() => RecipeListDto)
    async getSimilarRecipeList(
        @Args('recipeCredentials') recipeCredentials: string,
    ): Promise<RecipeListDto> {
        return this.recipesService.getSimilarRecipeList({
            recipeCredentials,
        })
    }

    @Query(() => [String])
    async searchRecipe(@Args('query') query: string): Promise<string[]> {
        return this.recipesService.searchRecipe({
            query,
        })
    }

    @Mutation(() => String)
    async addRecipe(
        userId: number,
        recipeCredentials: string,
    ): Promise<string> {
        return this.recipesService.addRecipe({
            userId,
            recipeCredentials,
        })
    }

    @Mutation(() => String)
    async removeRecipe(
        userId: number,
        recipeCredentials: string,
    ): Promise<string> {
        return this.recipesService.removeRecipe({
            userId,
            recipeCredentials,
        })
    }
}
