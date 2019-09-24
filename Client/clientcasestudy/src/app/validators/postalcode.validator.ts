import { AbstractControl } from '@angular/forms';
export function ValidatePostalCode(control: AbstractControl) {
  const POSTALCODE_REGEXP = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  return !POSTALCODE_REGEXP.test(control.value) ? {invalidPostalcode: true} : null;
} // ValidatePhone
