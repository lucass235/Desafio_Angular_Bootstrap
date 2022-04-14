import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { LoginService } from './login.service';

@Component({
  selector: 'ab-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formsLogin: FormGroup | any;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.formsLogin = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required],
      }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }

  login() {
    let user: User = new User();
    user.email = this.formsLogin.get('email').value;
    user.password = this.formsLogin.get('password').value;
    console.log(user);

    if (this.loginService.login(user)) {
      this.router.navigate(['/crud']);
    } else {
      alert('Usuario não cadastrado!');
    }
  }

  isLogged(): boolean {
    return this.loginService.isLogged();
  }
}
