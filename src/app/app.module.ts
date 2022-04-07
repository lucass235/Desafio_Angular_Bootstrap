import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudComponent } from './crud/crud.component';
import { CrudGuard } from './crud/crud.guard';
import { CrudService } from './crud/crud.service';
import { FormsComponent } from './forms/forms.component';
import { FormsGuard } from './forms/forms.guard';
import { FormsService } from './forms/forms.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, FormsComponent, CrudComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [CrudService, FormsService, FormsGuard, CrudGuard, FormsComponent],
  bootstrap: [AppComponent],
  exports: [ReactiveFormsModule, FormsModule],
})
export class AppModule {}
