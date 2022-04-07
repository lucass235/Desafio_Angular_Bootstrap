import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsComponent } from './../forms/forms.component';
import { Usuario } from './../forms/usuario.model';
import { CrudService } from './crud.service';

@Component({
  selector: 'ab-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  usuarios: Usuario[] = [];

  user: Usuario | undefined;

  constructor(
    private CrudService: CrudService,
    private route: Router,
    private formsComponent: FormsComponent
  ) {}

  ngOnInit(): void {
    this.CrudService.getUsers().subscribe((users) => {
      this.usuarios = users;
    });
  }

  deleteUser(id: any) {
    this.CrudService.deleteUser(id).subscribe((user) => {
      console.log(`Usuario deletado`);
    });
  }

  updateUser(user: Usuario) {
    this.CrudService.getUserId(user).subscribe((response) => {
      this.user = response;
      // this.formsComponent.forms.reset(this.user);
      this.route.navigate([`edit/${user.id}`]);
    });
  }
}
