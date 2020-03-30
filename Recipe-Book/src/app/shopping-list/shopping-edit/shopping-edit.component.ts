import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, AfterViewInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
  }

  onAddItem(){
    const newIngredient: Ingredient = {
      name: this.nameInputRef.nativeElement.value,
      amount: this.amountInputRef.nativeElement.value
    };
    this.ingredientAdded.emit(newIngredient);
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
