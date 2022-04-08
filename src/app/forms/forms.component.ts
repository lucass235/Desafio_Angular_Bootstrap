import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    this.forms = new FormGroup({
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
    });
    // this.forms.get('name').setValue('oi');

    this.activeRouter.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.formsService.getUserId(params['id']).subscribe((response) => {
          this.user = response;
          this.fillForms();
        });
      } else {
      }
    });
  }

  setDados() {
    if (this.id === undefined) {
      this.user = this.completForms();
      this.formsService.postApi(this.user).subscribe((response) => {
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

  fillForms() {
    this.forms.get('name').setValue(this.user?.name);
    this.forms.get('cpf').setValue(this.user?.CPF);
    this.forms.get('phone').setValue(this.user?.phone);
    this.forms.get('email').setValue(this.user?.email);
    this.forms.get('cep').setValue(this.user?.CEP);
    this.forms.get('number').setValue(this.user?.number);
    this.forms.get('complement').setValue(this.user?.complement);
    this.forms.get('street').setValue(this.user?.street);
    this.forms.get('district').setValue(this.user?.district);
    this.forms.get('city').setValue(this.user?.city);
    this.forms.get('states').setValue(this.user?.states);
    this.forms.get('position').setValue(this.user?.position);
    this.forms.get('technology').setValue(this.user?.technology);
    this.forms.get('framework').setValue(this.user?.framework);
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

  apiCEP() {
    console.log('oi');
    const url = `https://viacep.com.br/ws/${54580255}/json/`;
    fetch(url).then(console.log);
  }
}
