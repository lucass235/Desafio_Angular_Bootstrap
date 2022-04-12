import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate } from '@angular/router';
import { LoginService } from './../login/login.service';
import { FormsComponent } from './forms.component';

@Injectable()
export class FormsGuard implements CanActivate, CanDeactivate<FormsComponent> {
  constructor(private loginService: LoginService) {}

  canActivate(): boolean {
    if (!this.loginService.logged) {
      alert('Você não está logado!');
      return true;
    } else {
      return true;
    }
  }

  canDeactivate(): boolean {
    return window.confirm('Deseja sair da tela do forms?');
  }
}
