import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as UserModel from '../../models/user.model';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

interface Params {
  role: string;
  size: string;
  page: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = 'http://137.184.207.13:5000/v1';

  constructor(private http: HttpClient) {}

  queryUser(): Observable<any> {
    return this.http.get<any>(this.API_URL + `/users?`);
  }

  createUser(userData: UserModel.userCreate) {
    return this.http.post<any>(this.API_URL + '/users/', userData);
  }

  getUserById(id: number) {
    return this.http.get<any>(this.API_URL + `/users/${id}`);
  }

  updateUserById(user: UserModel.userUpdate, id: number) {
    return this.http.patch<any>(this.API_URL + `/users/${id}`, user);
  }

  deleteUserById(id: number) {
    return this.http.delete<any>(this.API_URL + `/users/${id}`);
  }

  getUserProfile() {
    return this.http
      .get<any>(`${this.API_URL}/users/my-profile`)
      .pipe(map((data) => data.data));
  }

  changeInfoUser(info: string, dataObj: any) {
    return this.http
      .patch<any>(`${this.API_URL}/users/change-${info}`, dataObj)
      .pipe(map((data) => data.data));
  }

  public exportToFile(fileName: string, element_id: string) {
    if (!element_id) throw new Error('Element Id does not exists');

    let tbl = document.getElementById(element_id);
    let wb = XLSX.utils.table_to_book(tbl);
    XLSX.writeFile(wb, fileName + '.xlsx');
  }
}
