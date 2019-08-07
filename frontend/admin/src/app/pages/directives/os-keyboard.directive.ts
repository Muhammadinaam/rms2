import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[osKeyboard]'
})
export class OsKeyboardDirective {

  constructor(private el: ElementRef) { }

  @HostListener('focus') focus() {
    console.log("abc");
  }

}
