import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from './../login/login.service';

@Component({
  selector: 'ab-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() logged: boolean = false;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  logout() {
    this.loginService.logged = false;
    this.loginService.logout();
  }
}
