import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataUser } from '../models/dataUser';
import { FormsService } from './forms.service';

@Component({
  selector: 'ab-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  public forms: FormGroup | any;

  // equalEmails: boolean | undefined;

  user: DataUser | undefined;
  id: number | undefined;

  constructor(
    private activeRouter: ActivatedRoute,
    private formsService: FormsService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
          validators: [Validators.required, Validators.minLength(11)],
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
        framework: new FormControl('', {
          validators: [Validators.required],
        }),
        neswllet: new FormControl('', {
          validators: [Validators.required],
        }),
      },
      { validators: [this.checkEmail] }
    );

    this.activeRouter.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.formsService.getUserId(params['id']).subscribe((response) => {
          this.fillForms(response);
        });
      }
    });
  }

  submit() {
    this.user = this.completForms();
    if (this.id === undefined) {
      this.formsService.postApi(this.user).subscribe((response) => {
        console.log('Usuario  (' + response.id + ') cadastrado!');
      });
    } else {
      this.formsService.updateUser(this.user).subscribe((response) => {
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
    this.forms.get('cep').setValue(values?.CEP);
    this.forms.get('number').setValue(values?.number);
    this.forms.get('complement').setValue(values?.complement);
    this.forms.get('street').setValue(values?.street);
    this.forms.get('states').setValue(values?.states);
    this.forms.get('city').setValue(values?.city);
    this.forms.get('district').setValue(values?.district);
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
      CEP: this.forms.value.cep,
      number: this.forms.value.number,
      complement: this.forms.value.complement,
      street: this.forms.value.street,
      district: this.forms.value.district,
      city: this.forms.value.city,
      states: this.forms.value.states,
      position: this.forms.value.position,
      technology: this.forms.value.technology,
      framework: this.forms.value.framework,
      neswllet: this.forms.value.neswllet,
      id: this.id,
    };
    return values;
  }

  consultCEP() {
    const cep = this.forms.get('cep').value;
    if (this.forms.get('cep').valid) {
      this.formsService.consultCEP(cep).subscribe((r: any) => {
        this.forms.get('complement').setValue(r.complemento);
        this.forms.get('district').setValue(r.bairro);
        this.forms.get('city').setValue(r.localidade);
        this.forms.get('street').setValue(r.logradouro);
        this.forms.get('states').setValue(r.uf);
      });
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
}
