import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AB_API } from './../../../../users.api';
import { Usuario } from './usuario.model';

@Injectable()
export class FormsService {
  api = AB_API;
  constructor(private http: HttpClient) {}

  postApi(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.api}/users`, user);
  }

  updateUser(user: Usuario): Observable<Usuario> {
    const url = `${this.api}/users/${user.id}`;
    return this.http.put<Usuario>(url, JSON.stringify(user));
  }

  getUserId(id: number) {
    return this.http.get<Usuario>(`${this.api}/users/${id}`);
  }
}
