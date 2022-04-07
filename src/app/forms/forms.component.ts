import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from './forms.service';
import { Usuario } from './usuario.model';
@Component({
  selector: 'ab-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  public forms: FormGroup | any;
  numberPath = /^[0-9]*$/;

  user: Usuario | undefined;
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
        validators: [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern(this.numberPath),
        ],
      }),
      phone: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern(this.numberPath),
        ],
      }),
      email: new FormControl('', {
        validators: [Validators.email, Validators.required],
      }),
      confirmEmail: new FormControl('', {
        validators: [Validators.email, Validators.required],
      }),
      cep: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern(this.numberPath),
        ],
      }),
      number: new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(5),
          Validators.pattern(this.numberPath),
          Validators.pattern(this.numberPath),
        ],
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
        console.log('Opa, rota sem id!');
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
      console.log('Rota com id!');
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
    this.forms.get('position').setValue(this.user?.position);
    this.forms.get('technology').setValue(this.user?.technology);
    this.forms.get('framework').setValue(this.user?.framework);
  }

  completForms(): Usuario {
    const values: Usuario = {
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

  // equalsEmail(email: FormControl) {
  //   return email.value === this.forms.get('email').value
  //     ? null
  //     : { emailDiferentes: true };
  // }
}
