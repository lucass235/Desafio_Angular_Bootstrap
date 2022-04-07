import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate } from '@angular/router';
import { FormsComponent } from './forms.component';

@Injectable()
export class FormsGuard implements CanActivate, CanDeactivate<FormsComponent> {
  canActivate(): boolean {
    return true;
  }

  canDeactivate(): boolean {
    return window.confirm('Deseja sair da tela do forms?');
  }
}
