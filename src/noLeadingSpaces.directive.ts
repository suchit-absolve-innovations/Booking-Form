import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[noLeadingSpaces]',
})
export class NoLeadingSpacesDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const trimmed = input.value
      .replace(/^\s+/, '') // Remove leading spaces
      .replace(/\s{2,}/g, ' '); // Allow only single spaces between words

    // Set the corrected value to the form control
    this.ngControl.control?.patchValue(trimmed);
  }
}
