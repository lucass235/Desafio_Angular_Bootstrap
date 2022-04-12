import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'ab-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'dasafioAB';
  constructor(private loginService: LoginService) {}

  isLogged() {
    return this.loginService.isLogged();
  }
}
