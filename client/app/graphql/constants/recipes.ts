import { gql } from '@apollo/client'

export const GET_RECIPE_PREVIEW = gql`
    query GetRecipePreview($page: Float!, $size: Float!, $query: String!, $sort: String!) {
        getRecipeList(
            page: $page,
            size: $size,
            query: $query,
            sort: $sort,
        ) {
            count
            data {
                recipeCredentials
                name
                description
                keywords
                time
                image
                rating
            }
        }
    }
`

export const GET_RECIPE = gql`
    query GetRecipe($recipeCredentials: String!) {
        getRecipe(recipeCredentials: $recipeCredentials) {
            recipeCredentials
            name
            description
            keywords
            price
            time
            video
            image
            calories
            carbohydrate
            fat
            fiber
            protein
            sugar
            rating
            topics
            tags
            ingredients {
                name
                text
                measurements
            }
            stages {
                id
                name
                time
            }
        }
    }
`

export const GET_SIMILAR_RECIPE_PREVIEW = gql`
    query GetSimilarRecipePreview($recipeCredentials: String!) {
        getSimilarRecipeList(recipeCredentials: $recipeCredentials) {
            count
            data {
                recipeCredentials
                name
                description
                keywords
                time
                image
                rating
            }
        }
    }
`

export const GET_USER_RECIPE_PREVIEW = gql`
    query GetUserRecipeList {
        getUserRecipeList {
            count
            data {
                recipeCredentials
                name
                description
                keywords
                time
                image
                rating
            }
        }
    }
`

export const SEARCH_RECIPE = gql`
    query SearchRecipe($query: String!) {
        searchRecipe(query: $query)
    }
`

export const ADD_RECIPE = gql`
    mutation AddRecipe(
        $recipeCredentials: String!
    ) {
        addRecipe(recipeCredentials: $recipeCredentials)
    }
`

export const REMOVE_RECIPE = gql`
    mutation RemoveRecipe(
        $recipeCredentials: String!
    ) {
        removeRecipe(recipeCredentials: $recipeCredentials)
    }
`
