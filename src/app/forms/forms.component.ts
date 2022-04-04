import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Frameworks } from './frameworks.model';

@Component({
  selector: 'ab-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  public forms: FormGroup | any;

  optionFramework: Frameworks[] = [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'jQuery', value: 'jquery' },
  ];
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
      street: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }
}
