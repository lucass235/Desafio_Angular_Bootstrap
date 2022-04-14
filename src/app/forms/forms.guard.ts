import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';
import { LoginService } from './../login/login.service';
import { FormsComponent } from './forms.component';

@Injectable()
export class FormsGuard implements CanActivate, CanDeactivate<FormsComponent> {
  constructor(private login: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.login.isLogged()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

  canDeactivate(): boolean {
    return true;
  }
}
