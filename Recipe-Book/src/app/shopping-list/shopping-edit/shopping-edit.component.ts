import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(){
    const newIngredient: Ingredient = {
      name: this.nameInputRef.nativeElement.value,
      amount: Number(this.amountInputRef.nativeElement.value)
    };
    this.shoppingListService.addIngredient(newIngredient);
    // this.ingredientAdded.emit(newIngredient);
    this.clearInputs();
  }

  deleteIngredient(){
    console.log("delete something");
  }

  clearInputs(){
    this.nameInputRef.nativeElement.value = "";
    this.amountInputRef.nativeElement.value = "";
  }

}
