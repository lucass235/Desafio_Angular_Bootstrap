import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataUser } from '../models/dataUser';
import { LoginService } from './../login/login.service';
import { HttpService } from './../shared/htpp.service';

@Component({
  selector: 'ab-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
  animations: [
    trigger('tagState', [
      state('hidden', style({ opacity: 1 })),
      transition('* => *', [
        style({ opacity: 0, transform: 'translate(10px, 20px)' }),
        animate('600ms 0s ease-in-out'),
      ]),
    ]),
  ],
})
export class CrudComponent implements OnInit {
  users: DataUser[] = [];
  myState = 'hidden';
  userLocalStore!: DataUser;

  constructor(
    private httpService: HttpService,
    private route: Router,
    private LoginService: LoginService
  ) {}

  ngOnInit(): void {
    this.setUsers();
  }

  setUsers() {
    this.httpService.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  deleteUser(id: any) {
    this.httpService.deleteUser(id).subscribe(() => {
      console.log(`Usuario deletado`);
      this.setUsers();
    });
  }

  updateUser(id: any) {
    this.route.navigate([`edit/${id}`]);
    this.httpService.getUserId(id).subscribe((r) => {});
  }

  checkLogged() {
    // return this.LoginService.isLogged();
    return this.LoginService.isLogged();
  }
}
