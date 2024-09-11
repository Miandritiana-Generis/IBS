// src/app/positive-number.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function positiveNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = Number(control.value);
    const isNotPositive = value <= 0;
    return isNotPositive ? { 'notPositive': { value: control.value } } : null;
  };
}