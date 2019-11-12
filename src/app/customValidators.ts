import {FormControl} from '@angular/forms';
import {isNumeric} from 'rxjs/internal-compatibility';

export class CustomValidators {

  static dueDateValidator(control: FormControl): {[key: string]: boolean} {
    if (new Date().toLocaleDateString() > new Date(control.value).toLocaleDateString()) {
      return {
        dueDateValid: true
      };
    }
    return null;
  }

  static checkNumberInName(control: FormControl): {[key: string]: boolean} {
    for (const item of control.value) {
      if (isNumeric(item)) {
        console.log('I see')
        return {
          numberInName: true
        };
      }
    }
    return null;
  }
}
