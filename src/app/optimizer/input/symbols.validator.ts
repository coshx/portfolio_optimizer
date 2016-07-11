import {AbstractControl} from '@angular/forms';

interface ValidationResult {
  [key: string]: boolean;
}

export class SymbolsValidator {

  static tooFewSymbols(control: AbstractControl): ValidationResult {
    let separated = control.value.split(',');
    if (separated.length < 2 || separated[1].length < 2) {
      return {'isCommaSeparated': true};
    }

    return null;
  }

  // static usernameTaken(control: Control): Promise<ValidationResult> {

  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (control.value === "David") {
  //         resolve({"usernameTaken": true})
  //       } else {
  //         resolve(null);
  //       };
  //     }, 1000);
  //   });
  // }
}
