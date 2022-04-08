import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  logged: boolean = false;

  setLogged(logged: boolean) {
    this.logged = logged;
  }
}
