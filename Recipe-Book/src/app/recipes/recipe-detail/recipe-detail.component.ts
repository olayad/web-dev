import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService
  ){ }

  ngOnInit(): void {
  }
10
  addIngredientsToShoppingList(){
    for (let ingredient of this.recipe.ingredients){
      this.shoppingListService.addIngredient(ingredient)
      console.log('Adding ingredient: ', ingredient, ' to shopping list');
    }
  }
}
