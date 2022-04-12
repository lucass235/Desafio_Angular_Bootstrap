import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from './../header/header.component';
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

  constructor(
    private loginService: LoginService,
    private headerComponent: HeaderComponent
  ) {}

  ngOnInit(): void {
    this.formsLogin = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required],
      }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }

  login() {
    let email = this.formsLogin.get('email').value;
    let password = this.formsLogin.get('password').value;
    let user: User = new User(email, password);
    this.loginService.login(user);
    // this.headerComponent.setLogged();
    // console.log('passou no login');
  }

  //   equalsDates() {
  //     for (let i = 0; i < this.users.length; i++) {
  //       if (
  //         this.users[i].email === this.formsLogin.get('email').value &&
  //         this.users[i].password === this.formsLogin.get('password').value
  //       ) {
  //         this.logged = true;
  //         return;
  //       } else {
  //         this.logged = false;
  //       }
  //     }
  //     if (!this.logged) {
  //       alert('Cadastro não encontrado!');
  //     }
  //   }
}
