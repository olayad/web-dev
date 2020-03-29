import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Eggs and bacon', 'This is simply a breakfast', 'https://images.unsplash.com/photo-1563636247809-c76f873625ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1260&q=80'),
    new Recipe('Lentil Soup', 'This is a soup', 'https://images.unsplash.com/photo-1510431198580-7727c9fa1e3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  ];
  @Output() passToParent = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  passEventToParent(recipeSelected){
    this.passToParent.emit(recipeSelected)
  }
}
