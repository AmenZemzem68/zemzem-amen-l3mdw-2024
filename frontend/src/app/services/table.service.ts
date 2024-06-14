import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  public host = environment.host
  private baseUrl: string = `${this.host}:8070/api`;

  constructor(private http : HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Table`);
  }
  addTable(tableData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Table`, tableData);
  }
  updateTable(id : number ,table: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Table/${id}`, table);
  }
  delete(id:number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Table/${id}`);
  }
}
