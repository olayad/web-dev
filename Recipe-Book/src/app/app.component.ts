import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentPage: string = 'recipe';



  changeCurrentPage(page){
    console.log('Page clicked is: ', page);
    this.currentPage = page;
  }
}
