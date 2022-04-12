import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';

@Injectable()
export class LoginService {
  logged: boolean = false;

  user: User = new User('lucas', '123');

  constructor(private router: Router) {}

  login(user: User) {
    if (
      this.user.email === user.email &&
      this.user.password === user.password
    ) {
      this.logged = true;
      this.router.navigate(['/crud']);
    } else {
      this.logged = false;
      alert('Dados não cadastrados!');
    }
  }

  isLogged() {
    return this.logged;
  }

  logout() {
    this.logged = false;
    this.router.navigate(['/']);
  }
}
