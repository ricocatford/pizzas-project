export type Pizza = {
    id: string;
    name: string;
    recipe: Recipe;
}

type Recipe = {
    ingredients: string[];
    allergens: string[];
}