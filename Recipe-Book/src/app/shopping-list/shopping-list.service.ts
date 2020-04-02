import {Ingredient} from "../shared/ingredient.model";
import {EventEmitter, Injectable} from "@angular/core";

@Injectable({providedIn:'root'})
export class ShoppingListService {
  ingredientsChanged  = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 4),
    new Ingredient( 'Tomatoe', 10)
  ];

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.getIngredients())
  }

  getIngredients(){
    return this.ingredients.slice();

  }
}
