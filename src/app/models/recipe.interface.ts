import { IIngredientResponse } from "./IngredientResponse";
import { ITagResponse } from "./TagResponse";
import { iUser } from "./iUser";
import { IUtensilResponse } from "./UtensilResponse";

export interface RecipeRequest {
  title: string;
  description: string;
  preparationTime: number;
  cookingTime: number;
  userId: number;
  ingredientIds: number[];
  utensilIds?: number[];
  tagIds?: number[];
}

export interface RecipeResponse {
  id: number;
  title: string;
  description: string;
  preparationTime: number;
  cookingTime: number;
  user: iUser;
  ingredients: IIngredientResponse[];
  utensils: IUtensilResponse[];
  tags: ITagResponse[];
  likedByUsers: iUser[];
}
