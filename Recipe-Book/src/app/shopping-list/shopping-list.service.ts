import {Ingredient} from "../shared/ingredient.model";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({providedIn:'root'})
export class ShoppingListService {
  ingredientsChanged  = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Pear', 10),
    new Ingredient( 'Lemon', 10)
  ];

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.getIngredients())
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.getIngredients())
  }

  getIngredients(){
    return this.ingredients.slice();
  }
}
