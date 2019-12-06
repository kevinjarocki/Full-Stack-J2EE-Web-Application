import { AbstractControl } from '@angular/forms';
export function ValidateDecimal(control: AbstractControl) {
  const DECIMAL_REGEXP = /^\d+$/;
  return !DECIMAL_REGEXP.test(control.value) ? {invalidInt: true} : null;
}
