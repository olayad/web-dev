import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature: string = 'recipe';

  onNavigate(feature: string){
    console.log('Feature clicked is: ', feature);
    this.loadedFeature = feature;
  }
}
