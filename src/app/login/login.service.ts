import { Injectable } from '@angular/core';
import { User } from './../models/user.model';

@Injectable()
export class LoginService {
  user!: User;

  constructor() {}

  login(user: User) {
    const userMock = new User();
    userMock.email = 'lucas';
    userMock.password = '123';

    if (userMock.email === user.email && userMock.password === user.password) {
      this.user = user;
      return true;
    }
    return false;
  }

  isLogged() {
    if (this.user && this.user.email) {
      return true;
    }
    return false;
  }

  logout() {
    this.user = {};
  }
}
