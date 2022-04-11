import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { User } from './user.model';

@Component({
  selector: 'ab-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formsLogin: FormGroup | any;
  public logged: boolean = false;
  users: User[] = [
    { email: 'lucas@gmail.com', password: '123' },
    { email: 'livia@gmail.com', password: '321' },
  ];
  constructor(private loginService: LoginService, private route: Router) {}

  ngOnInit(): void {
    this.formsLogin = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }

  login() {
    this.equalsDates();
    if (this.logged) {
      this.loginService.setLogged(this.logged);
      this.route.navigate(['/crud']);
    }
  }

  equalsDates() {
    for (let i = 0; i < this.users.length; i++) {
      if (
        this.users[i].email === this.formsLogin.get('email').value &&
        this.users[i].password === this.formsLogin.get('password').value
      ) {
        this.logged = true;
        return;
      } else {
        this.logged = false;
      }
    }
    if (!this.logged) {
      alert('Cadastro não encontrado!');
    }
  }
}
