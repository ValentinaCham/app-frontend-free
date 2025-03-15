import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment.development';
import { Observable } from 'rxjs';
import { Space } from '../interfaces/space';

@Injectable({
  providedIn: 'root'
})
export class SpaceService {

  private AppUrl: string;
  private ApiUrl: string;

  constructor(
    private http: HttpClient
  ) { 
    this.AppUrl = environment.apiUrl;
    this.ApiUrl = '/space';
  }

  list(): Observable<Space[]> {
    console.log(`${this.AppUrl}${this.ApiUrl}/list`);
    return this.http.get<Space[]>(`${this.AppUrl}${this.ApiUrl}`);
  }
}
