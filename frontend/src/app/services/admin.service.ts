import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  public host = environment.host
  private baseUrl: string = `${this.host}:8070/api`;

  constructor(private http: HttpClient) { }

  getAdminById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Administrateur/${id}`);
  }
}
