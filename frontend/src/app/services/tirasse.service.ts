import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TirasseService {
  public host = environment.host
  private baseUrl: string = `${this.host}:8070/api`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Tirasse`);
  }
  addTirasse(tirasseData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Tirasse`, tirasseData);
  }
  updateTirasse(id : number ,tirasse: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Tirasse/${id}`, tirasse);
  }
  delete(id:number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Tirasse/${id}`);
  }
}
