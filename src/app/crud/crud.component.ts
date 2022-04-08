import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataUser } from '../forms/dataUser';
import { LoginService } from './../login/login.service';
import { CrudService } from './crud.service';

@Component({
  selector: 'ab-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  usuarios: DataUser[] = [];
  logged: boolean = false;
  user: DataUser | undefined;

  constructor(
    private CrudService: CrudService,
    private route: Router,
    private LoginService: LoginService
  ) {}

  ngOnInit(): void {
    this.CrudService.getUsers().subscribe((users) => {
      this.usuarios = users;
    });
    this.logged = this.LoginService.logged;
  }

  deleteUser(id: any) {
    this.CrudService.deleteUser(id).subscribe((user) => {
      console.log(`Usuario deletado`);
      this.route.navigate(['/crud']);
    });
  }

  updateUser(user: DataUser) {
    this.CrudService.getUserId(user).subscribe((response) => {
      this.user = response;
      // this.formsComponent.forms.reset(this.user);
      this.route.navigate([`edit/${user.id}`]);
    });
  }
}
