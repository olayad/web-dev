import {EventEmitter} from "@angular/core";
import {Recipe} from "./recipe.model";

export class RecipeService{
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Eggs and bacon', 'This is simply a breakfast', 'https://images.unsplash.com/photo-1563636247809-c76f873625ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1260&q=80'),
    new Recipe('Lentil Soup', 'This is a soup', 'https://images.unsplash.com/photo-1510431198580-7727c9fa1e3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  ];

  getRecipes(){
    return this.recipes.slice();
  }
}

