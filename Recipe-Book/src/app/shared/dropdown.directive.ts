import {Directive, DoCheck, ElementRef, Host, HostBinding, HostListener, OnInit, Renderer2} from "@angular/core";

@Directive({
  selector: '[app-dropdown]'
})

export class DropdownDirective implements OnInit {
  @HostBinding('class.open') isOpen: boolean = false;

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
  }

  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
    console.log(this.elRef)
  }

}
