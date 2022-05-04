import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataUser } from '../models/dataUser';
import { Framework } from '../models/framework.model';
import { HttpService } from '../shared/htpp.service';

@Component({
  selector: 'ab-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
  animations: [
    trigger('tagState', [
      state('hidden', style({ opacity: 1 })),
      transition('* => *', [
        style({ opacity: 0, transform: 'translate(10px, 20px)' }),
        animate('600ms 0s ease-in-out'),
      ]),
    ]),
  ],
})
export class FormsComponent implements OnInit {
  public forms: FormGroup | any;
  myState = 'hidden';
  user: DataUser | undefined;
  id: number | undefined;
  cepInvalid: boolean = false;
  districtActive: any = true;
  states: any;
  frameworks: Framework[] = [
    {
      name: 'Angular',
      control: 'angular',
      value: 'angular',
      id: 'checkAngular',
    },
    {
      name: 'React',
      control: 'react',
      value: 'react',
      id: 'checkReact',
    },
    {
      name: 'Vue',
      control: 'vue',
      value: 'vue',
      id: 'checkVue',
    },
    {
      name: 'Jquery',
      control: 'jquery',
      value: 'jquery',
      id: 'checkJquery',
    },
  ];

  constructor(
    private activeRouter: ActivatedRoute,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.httpService.getStates().subscribe((r) => {
      this.states = r;
      console.log(this.states);
    });
    this.activeRouter.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.httpService.getUserId(params['id']).subscribe((response) => {
          this.user = response;
          this.fillForms(this.user);
        });
      }
    });

    this.forms = new FormGroup(
      {
        name: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ],
        }),
        cpf: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(11),
            this.isValidCpf,
          ],
        }),
        phone: new FormControl('', {
          validators: [Validators.required, Validators.minLength(11)],
        }),
        email: new FormControl('', {
          validators: [Validators.email, Validators.required],
        }),
        confirmEmail: new FormControl('', {
          validators: [Validators.email, Validators.required],
        }),
        cep: new FormControl('', {
          validators: [Validators.required, Validators.minLength(8)],
        }),
        number: new FormControl('', {
          validators: [Validators.required],
        }),
        complement: new FormControl('', {
          validators: [],
        }),
        district: new FormControl('', {
          validators: [Validators.required],
        }),
        city: new FormControl('', {
          validators: [Validators.required],
        }),
        states: new FormControl('', {
          validators: [Validators.required],
        }),
        position: new FormControl('', {
          validators: [Validators.required],
        }),
        technology: new FormControl('', {
          validators: [Validators.required],
        }),
        street: new FormControl('', {
          validators: [Validators.required],
        }),
        framework: new FormGroup(
          {
            angular: new FormControl(false),
            react: new FormControl(false),
            vue: new FormControl(false),
            jquery: new FormControl(false),
          },
          { validators: this.checkFrameworks }
        ),
        neswllet: new FormControl('', {
          validators: [Validators.required],
        }),
        terms: new FormControl('', {
          validators: [Validators.required],
        }),
      },
      { validators: [this.checkEmail] }
    );
  }

  submit() {
    this.user = this.completForms();
    if (this.id === undefined) {
      this.httpService.postApi(this.user).subscribe((response) => {
        console.log('Usuario  (' + response.id + ') cadastrado!');
      });
    } else {
      this.httpService.updateUser(this.user).subscribe((response) => {
        console.log('Usuario  (' + response.id + ') editado!');
      });
    }
    this.router.navigate(['/crud']);
  }

  fillForms(values: DataUser) {
    this.forms.get('name').setValue(values?.name);
    this.forms.get('cpf').setValue(values?.CPF);
    this.forms.get('phone').setValue(values?.phone);
    this.forms.get('email').setValue(values?.email);
    this.forms.get('cep').setValue(values?.address.CEP);
    this.forms.get('number').setValue(values?.address.number);
    this.forms.get('complement').setValue(values?.address.complement);
    this.forms.get('street').setValue(values?.address.street);
    this.forms.get('states').setValue(values?.address.states);
    this.forms.get('city').setValue(values?.address.city);
    this.forms.get('district').setValue(values?.address.district);
    this.forms.get('position').setValue(values?.position);
    this.forms.get('technology').setValue(values?.technology);
    this.forms.get('framework').setValue(values?.framework);
  }

  resetForms() {
    this.forms.reset();
  }

  completForms(): DataUser {
    const values: DataUser = {
      name: this.forms.value.name,
      CPF: this.forms.value.cpf,
      phone: this.forms.value.phone,
      email: this.forms.value.email,
      confirmEmail: this.forms.value.confirmEmail,
      address: {
        CEP: this.forms.value.cep,
        number: this.forms.value.number,
        complement: this.forms.value.complement,
        street: this.forms.value.street,
        district: this.forms.value.district,
        city: this.forms.value.city,
        states: this.forms.value.states,
      },
      position: this.forms.value.position,
      technology: this.forms.value.technology,
      framework: this.forms.value.framework,
      neswllet: this.forms.value.neswllet,
      id: this.id,
    };
    return values;
  }

  consultCEP() {
    let cep = this.forms.get('cep').value;

    if (this.forms.get('cep').valid) {
      this.httpService.consultCEP(cep).subscribe((r: any) => {
        if ('erro' in r) {
          this.cepInvalid = true;
          this.forms.get('cep')?.setErrors({ cepInValid: true });
        } else {
          this.forms.get('complement').setValue(r.complemento);
          this.forms.get('district').setValue(r.bairro);
          this.forms.get('city').setValue(r.localidade);
          this.forms.get('street').setValue(r.logradouro);
          this.forms.get('states').setValue(r.uf);
          this.activeDistrict();
        }
      });
    } else {
      this.districtActive = true;
    }

    if (this.forms.get('cep').invalid || this.cepInvalid) {
      this.forms.get('complement').reset();
      this.forms.get('district').reset();
      this.forms.get('city').reset();
      this.forms.get('states').reset();
      this.forms.get('street').reset();
    }
  }

  checkEmail(control: AbstractControl) {
    if (control.get('email')?.value === control.get('confirmEmail')?.value) {
      return null;
    } else {
      control.get('confirmEmail')?.setErrors({ Emailsdifferent: true });
      // control.get('confirmEmail')?.setErrors(null); // setar como valido
      return { Emailsdifferent: true };
    }
  }

  checkFrameworks(control: AbstractControl) {
    let check: boolean = false;
    Object.keys(control.value).forEach((i) => {
      if (control.value[i]) {
        check = true;
      }
    });
    if (check) {
      return null;
    } else {
      return { frameworksInvalid: true };
    }
  }

  isValidCpf(control: AbstractControl) {
    const cpf = control.value;
    if (cpf) {
      let numbers, digits, sum, i, result, equalDigits;
      equalDigits = 1;
      if (cpf.length < 11) {
        return null;
      }

      for (i = 0; i < cpf.length - 1; i++) {
        if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
          equalDigits = 0;
          break;
        }
      }

      if (!equalDigits) {
        numbers = cpf.substring(0, 9);
        digits = cpf.substring(9);
        sum = 0;
        for (i = 10; i > 1; i--) {
          sum += numbers.charAt(10 - i) * i;
        }

        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (result !== Number(digits.charAt(0))) {
          control.get('cpf')?.setErrors({ cpfNotValid: true });

          return { cpfNotValid: true };
        }
        numbers = cpf.substring(0, 10);
        sum = 0;

        for (i = 11; i > 1; i--) {
          sum += numbers.charAt(11 - i) * i;
        }
        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (result !== Number(digits.charAt(1))) {
          return { cpfNotValid: true };
        }
        return null;
      } else {
        control.get('cpf')?.setErrors({ cpfNotValid: true });

        return { cpfNotValid: true };
      }
    }
    return null;
  }

  validatorSet(control: any) {
    return {
      'is-valid':
        this.forms.get(control).valid &&
        (this.forms.get(control).dirty || this.forms.get(control).touched),
      'is-invalid':
        this.forms.get(control).invalid &&
        (this.forms.get(control).dirty || this.forms.get(control).touched),
    };
  }

  setDisabled(control: any) {
    if (
      (this.forms.get(control).value && this.forms.get('cep').valid) ||
      this.forms.get('cep').invalid
    ) {
      return true;
    }
    return null;
  }

  activeDistrict() {
    if (this.forms.get('district').value) {
      this.districtActive = true;
    } else {
      this.districtActive = null;
    }
  }
}
