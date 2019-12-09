import {FormControl} from '@angular/forms';
import {isNumeric} from 'rxjs/internal-compatibility';

export class CustomValidators {

  static dueDateValidator(control: FormControl): {[key: string]: boolean} {

    if (new Date() > new Date(control.value) ){
      return {
        dueDateValid: true
      };
    }
    return null;
  }

  static checkNumberInName(control: FormControl): {[key: string]: boolean} {
    if(control.value) {
      for (const item of control.value) {
        if (isNumeric(item)) {
          return {
            numberInName: true
          };
        }
      }
      return null;
    }
    }
}
