import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate } from '@angular/router';
import { CrudComponent } from './crud.component';
@Injectable()
export class CrudGuard implements CanActivate, CanDeactivate<CrudComponent> {
  canActivate() {
    return true;
  }
  canDeactivate(): boolean {
    return window.confirm('Deseja sair da tela do crud?');
  }
}
