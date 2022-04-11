import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataUser } from './dataUser';
import { FormsService } from './forms.service';
import { Validation } from './validation';

@Component({
  selector: 'ab-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  public forms: FormGroup | any;

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
          validators: [
            Validators.email,
            Validators.required,
            // this.checkEmail,
            // Validation.emalsEquals,
          ],
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
      }
      // { validators: [this.checkEmail] }
    );

    this.activeRouter.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.formsService.getUserId(params['id']).subscribe((response) => {
          // this.user = response;
          this.fillForms(response);
        });
      } else {
      }
    });
    // this.checkEmail(); TODO: DELERAR
  }

  submit() {
    if (this.id === undefined) {
      this.user = this.completForms();
      this.formsService.postApi(this.user).subscribe(() => {
        console.log('Cadastrado');
      });
    } else {
      this.user = this.completForms();
      console.log(this.user);

      this.formsService.updateUser(this.user).subscribe(() => {
        console.log('Usuario editado');
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
    this.forms.get('street').setValue(values?.city);
    this.forms.get('states').setValue(values?.states);
    this.forms.get('position').setValue(values?.position);
    this.forms.get('technology').setValue(values?.technology);
    this.forms.get('framework').setValue(values?.framework);
  }

  resetForms() {
    this.forms.get('name').setValue();
    this.forms.get('cpf').setValue();
    this.forms.get('phone').setValue();
    this.forms.get('email').setValue();
    this.forms.get('confirmEmail').setValue();
    this.forms.get('cep').setValue();
    this.forms.get('number').setValue();
    this.forms.get('complement').setValue();
    this.forms.get('street').setValue();
    this.forms.get('district').setValue();
    this.forms.get('city').setValue();
    this.forms.get('states').setValue();
    this.forms.get('position').setValue();
    this.forms.get('technology').setValue();
    this.forms.get('framework').setValue();
    this.forms.get('neswllet').setValue();
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

  equalsEmail() {
    return Validation.emalsEquals(this.forms);
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
    console.log(control);

    if (
      this.forms.get('email').value === this.forms.get('confirmEmail').value
    ) {
      // this.forms.get('confirmEmail').valid = true;
      console.log('Iguais');

      return null;
    } else {
      console.log('diferentes');

      return { EmailsDiferentes: true };
    }

    // console.log(email);
  }
}
