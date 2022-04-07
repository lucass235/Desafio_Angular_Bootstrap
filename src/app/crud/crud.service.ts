import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AB_API } from '../../../../users.api';
import { FormsService } from './../forms/forms.service';
import { Usuario } from './../forms/usuario.model';

@Injectable()
export class CrudService {
  usuarios: Usuario[] = [];
  api = AB_API;

  constructor(private formsService: FormsService, private http: HttpClient) {}

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.api}/users`);
  }

  deleteUser(id: number): Observable<Usuario> {
    const url = `${this.api}/users/${id}`;
    return this.http.delete<Usuario>(url);
  }

  getUserId(user: Usuario): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.api}/users/${user.id}`);
  }
}
