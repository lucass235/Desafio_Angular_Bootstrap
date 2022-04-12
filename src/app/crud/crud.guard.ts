import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate } from '@angular/router';
import { LoginService } from './../login/login.service';
import { CrudComponent } from './crud.component';
@Injectable()
export class CrudGuard implements CanActivate, CanDeactivate<CrudComponent> {
  constructor(private loginService: LoginService) {}

  canActivate() {
    if (!this.loginService.isLogged()) {
      alert('Você não está logado!');
    }
    return true;
  }
  canDeactivate(): boolean {
    return window.confirm('Deseja sair da tela do crud?');
  }
}
