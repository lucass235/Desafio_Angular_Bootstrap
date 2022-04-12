import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AB_API } from '../../../../users.api';
import { DataUser } from '../forms/dataUser';

@Injectable()
export class CrudService {
  api = AB_API;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<DataUser[]> {
    return this.http.get<DataUser[]>(`${this.api}/users`);
  }

  deleteUser(id: number): Observable<DataUser> {
    const url = `${this.api}/users/${id}`;
    return this.http.delete<DataUser>(url);
  }
}
