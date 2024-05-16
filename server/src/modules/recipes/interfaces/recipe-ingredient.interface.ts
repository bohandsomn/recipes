/**
 * @description `section.component` from external api
 */
export interface IRecipeIngredient {
    /**
     * @description `ingredient.name` from external api
     */
    readonly name: string | null
    /**
     * @description `ingredient.raw_text` from external api
     */
    readonly text: string | null
    /**
     * @description `ingredient.measurement.quantity` and `ingredient.measurement.unit_name` from external api. Measurement = Quantity + Unit name
     */
    readonly measurements: string[] | null
}
