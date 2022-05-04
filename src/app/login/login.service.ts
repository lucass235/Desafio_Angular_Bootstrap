import { Injectable } from '@angular/core';
import { User } from './../models/user.model';

@Injectable()
export class LoginService {
  // user!: User;
  public email: string = 'lucas';

  login(user: User) {
    const userMock = new User();
    userMock.email = this.email;
    userMock.password = '123';

    if (userMock.email === user.email && userMock.password === user.password) {
      // this.user = user;
      window.sessionStorage.setItem(user.email, user.password); // guarda dados na sessionStore
      return true;
    }
    return false;
  }

  isLogged() {
    if (window.sessionStorage.length) {
      return true;
    }
    return false;
  }

  logout() {
    window.sessionStorage.removeItem(this.email);
  }
}
