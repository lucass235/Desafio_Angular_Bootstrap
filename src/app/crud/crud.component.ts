import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataUser } from '../models/dataUser';
import { LoginService } from './../login/login.service';
import { HttpService } from './../shared/htpp.service';

@Component({
  selector: 'ab-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  users: DataUser[] = [];

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
    });
  }

  updateUser(id: any) {
    this.route.navigate([`edit/${id}`]);
  }

  isLogged() {
    return this.LoginService.isLogged();
  }
}
