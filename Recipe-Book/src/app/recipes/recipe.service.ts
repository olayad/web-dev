import {EventEmitter, Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService{
  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService){}

  private recipes: Recipe[] = [
    new Recipe(
      'Eggs and bacon',
      'This is simply a breakfast',
      'https://images.unsplash.com/photo-1563636247809-c76f873625ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1260&q=80',
      [new Ingredient('Tomato', 1), new Ingredient( 'olives',  2)]),
    new Recipe(
      'Lentil Soup',
      'This is a soup',
      'https://images.unsplash.com/photo-1510431198580-7727c9fa1e3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
      [new Ingredient('Artichokes', 3), new Ingredient( 'pepper',  4)]),
  ];

  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
      // this.shoppingListService.addIngredients(ingredients)
    this.shoppingListService.addIngredients(ingredients);
  }
}

