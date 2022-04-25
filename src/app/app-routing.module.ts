import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './crud/crud.component';
import { CrudGuard } from './crud/crud.guard';
import { FormsComponent } from './forms/forms.component';
import { FormsGuard } from './forms/forms.guard';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
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
    path: 'forms',
    component: FormsComponent,
    // canActivate: [FormsGuard],
    // canDeactivate: [FormsGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
