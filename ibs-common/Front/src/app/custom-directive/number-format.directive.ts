import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumberFormat]',
  standalone: true,
})
export class NumberFormatDirective {
  constructor(
    private el: ElementRef,
    private control: NgControl,
    private renderer: Renderer2
  ) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/,/g, '');

    if (!isNaN(Number(value))) {
      this.control.control?.setValue(value);
      this.renderer.setProperty(
        input,
        'value',
        Number(value).toLocaleString('en-US')
      );
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/,/g, '');

    if (!isNaN(Number(value))) {
      this.renderer.setProperty(
        input,
        'value',
        Number(value).toLocaleString('en-US')
      );
    }
  }

  @HostListener('focus', ['$event'])
  onFocus(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/,/g, '');

    if (!isNaN(Number(value))) {
      this.renderer.setProperty(input, 'value', value);
    }
  }
}
