import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ab-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  public forms: FormGroup | any;
  constructor() {}

  ngOnInit(): void {
    this.forms = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)],
      }),
      cpf: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(11)],
      }),
      phone: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11),
        ],
      }),
      email: new FormControl('', {
        validators: [Validators.email, Validators.required],
      }),
      confirmEmail: new FormControl('', {
        validators: [Validators.email, Validators.required],
      }),
      cep: new FormControl('', {
        validators: [Validators.required],
      }),
      number: new FormControl('', {
        validators: [Validators.required],
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
      frame: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }
}
