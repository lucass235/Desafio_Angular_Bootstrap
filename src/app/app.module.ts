import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudComponent } from './crud/crud.component';
import { CrudGuard } from './crud/crud.guard';
import { CrudService } from './crud/crud.service';
import { FooterComponent } from './footer/footer.component';
import { FormsComponent } from './forms/forms.component';
import { FormsGuard } from './forms/forms.guard';
import { FormsService } from './forms/forms.service';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { NotFoundComponent } from './not-found/not-found.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    CrudComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [
    CrudService,
    FormsService,
    FormsGuard,
    CrudGuard,
    LoginService,
    HeaderComponent,
  ],
  bootstrap: [AppComponent],
  exports: [ReactiveFormsModule, FormsModule],
})
export class AppModule {}
