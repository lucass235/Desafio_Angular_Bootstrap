import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataUser } from '../models/dataUser';
import { AB_API } from '../models/users.api';

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
