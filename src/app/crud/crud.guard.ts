import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate } from '@angular/router';
import { CrudComponent } from './crud.component';
@Injectable()
export class CrudGuard implements CanActivate, CanDeactivate<CrudComponent> {
  constructor() {}

  canActivate(): boolean {
    return true;
  }
  canDeactivate(): boolean {
    return true;
  }
}
