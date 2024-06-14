import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public host = environment.host
  private baseUrl: string = `${this.host}:8070/api`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Client`);
  }

  getClientById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Client/${id}`);
  }
  updateClient(id: number, clientData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/Client/${id}`, clientData);
  }
  delete(id:number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Client/${id}`);
  }
}
