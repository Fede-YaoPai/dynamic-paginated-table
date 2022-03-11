import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fighter } from 'src/app/models/global.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getFighters(): Observable<Fighter[]> {
    return this.http.get<Fighter[]>('https://60d340e6858b410017b2f4b9.mockapi.io/api/fighters');
  }
}
