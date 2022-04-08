import { AbstractControl } from '@angular/forms';

export class Validation {
  static emalsEquals(forms: AbstractControl) {
    const confirmEmail = forms.value;
    const email = forms.get('phone')?.value;
    console.log(email);
    console.log(confirmEmail);

    if (confirmEmail === email) {
      console.log('igual');

      return null;
    }
    console.log('Diferente');

    return { emailsInvalid: true };
  }
}
