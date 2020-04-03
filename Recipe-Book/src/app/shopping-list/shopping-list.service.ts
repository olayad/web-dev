import {Ingredient} from "../shared/ingredient.model";
import {EventEmitter, Injectable} from "@angular/core";

@Injectable({providedIn:'root'})
export class ShoppingListService {
  ingredientsChanged  = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Pear', 10),
    new Ingredient( 'Lemon', 10)
  ];

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.getIngredients())
  }

  getIngredients(){
    return this.ingredients.slice();

  }
}
