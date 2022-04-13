import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AB_API } from 'src/app/models/users.api';
import { DataUser } from './dataUser';

@Injectable()
export class FormsService {
  api = AB_API;
  constructor(private http: HttpClient) {}

  postApi(user: DataUser): Observable<DataUser> {
    return this.http.post<DataUser>(`${this.api}/users`, user);
  }

  updateUser(user: DataUser): Observable<DataUser> {
    const url = `${this.api}/users/${user.id}`;
    return this.http.put<DataUser>(url, user);
  }

  getUserId(id: number) {
    return this.http.get<DataUser>(`${this.api}/users/${id}`);
  }

  consultCEP(cep: string) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
  }
}
