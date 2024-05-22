import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[OnlyNumbers]'
})
export class OnlyNumberDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const inputElement = this._el.nativeElement;
    let inputValue: string = inputElement.value;

    // Remove non-numeric characters
    inputValue = inputValue.replace(/[^0-9]/g, '');

    // Remove leading zeros if there are more than one
    inputValue = inputValue.replace(/^0+(\d)/, '$1');

    // Update the input value
    inputElement.value = inputValue;
  }
}
