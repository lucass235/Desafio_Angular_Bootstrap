import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudComponent } from './crud/crud.component';
import { FormsComponent } from './forms/forms.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, FormsComponent, CrudComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ReactiveFormsModule, FormsModule],
})
export class AppModule {}
