import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataUser } from '../models/dataUser';
import { LoginService } from './../login/login.service';
import { CrudService } from './crud.service';

@Component({
  selector: 'ab-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  users: DataUser[] = [];
  logged: boolean = false;
  user: DataUser | undefined;

  constructor(
    private CrudService: CrudService,
    private route: Router,
    private LoginService: LoginService
  ) {}

  ngOnInit(): void {
    this.setUsers();
    this.logged = this.LoginService.isLogged();
  }

  setUsers() {
    this.CrudService.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  deleteUser(id: any) {
    this.CrudService.deleteUser(id).subscribe(() => {
      console.log(`Usuario deletado`);
    });
  }

  updateUser(id: any) {
    this.route.navigate([`edit/${id}`]);
  }
}
