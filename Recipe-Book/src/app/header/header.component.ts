import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  @Output() notifyPageChanged: EventEmitter<any> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(feature: string){
    if (feature === 'recipe'){
      this.notifyPageChanged.emit('recipe');
    } else {
      this.notifyPageChanged.emit('shopping');
    }
  }

}
