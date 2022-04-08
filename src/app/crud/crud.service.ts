import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AB_API } from '../../../../users.api';
import { DataUser } from '../forms/dataUser';
import { FormsService } from './../forms/forms.service';

@Injectable()
export class CrudService {
  usuarios: DataUser[] = [];
  api = AB_API;

  constructor(private formsService: FormsService, private http: HttpClient) {}

  getUsers(): Observable<DataUser[]> {
    return this.http.get<DataUser[]>(`${this.api}/users`);
  }

  deleteUser(id: number): Observable<DataUser> {
    const url = `${this.api}/users/${id}`;
    return this.http.delete<DataUser>(url);
  }

  getUserId(user: DataUser): Observable<DataUser> {
    return this.http.get<DataUser>(`${this.api}/users/${user.id}`);
  }
}
