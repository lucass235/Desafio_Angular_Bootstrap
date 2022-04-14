import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate } from '@angular/router';
import { LoginService } from './../login/login.service';
import { CrudComponent } from './crud.component';
@Injectable()
export class CrudGuard implements CanActivate, CanDeactivate<CrudComponent> {
  constructor(private loginService: LoginService) {}

  canActivate() {
    return true;
  }
  canDeactivate(): boolean {
    return true;
  }
}
