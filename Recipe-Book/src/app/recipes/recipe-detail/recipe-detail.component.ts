import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: Recipe;
  recipe: Recipe;

  constructor(private recipeService: RecipeService) {
    console.log('hi');
    this.recipeService.newRecipeSelected.subscribe(
      (recipe) => {
        console.log('new recipe selected: ', recipe);
        this.recipe = recipe;
      }
    )
  }

  ngOnInit(): void {
  }

}
