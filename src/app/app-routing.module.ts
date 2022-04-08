import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './crud/crud.component';
import { CrudGuard } from './crud/crud.guard';
import { FormsComponent } from './forms/forms.component';
import { FormsGuard } from './forms/forms.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: FormsComponent,
    canActivate: [FormsGuard],
    canDeactivate: [FormsGuard],
  },
  {
    path: 'crud',
    component: CrudComponent,
    canActivate: [CrudGuard],
    canDeactivate: [CrudGuard],
  },
  {
    path: 'edit/:id',
    component: FormsComponent,
    canActivate: [FormsGuard],
    canDeactivate: [FormsGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
