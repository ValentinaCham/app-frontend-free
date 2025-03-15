import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private AppUrl: string;
  private ApiUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.ApiUrl = '';
    this.AppUrl = environment.apiUrl;
  }

  singIn(user: User): Observable<any> {
    return this.http.post(`${this.AppUrl}${this.ApiUrl}/register`, user);
  }

  logIn(user: User): Observable<string> {
    return this.http.post<string>(`${this.AppUrl}${this.ApiUrl}/login`, user);
  }
}
