import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { User } from './user.model';

@Component({
  selector: 'ab-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formsLogin: FormGroup | any;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.formsLogin = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required],
      }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }

  login() {
    if (!this.isLogged()) {
      let email = this.formsLogin.get('email').value;
      let password = this.formsLogin.get('password').value;
      let user: User = new User(email, password);
      this.loginService.login(user);
    } else {
      alert('Você já está logado!');
    }
  }
  isLogged(): boolean {
    return this.loginService.isLogged();
  }
}
