import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public host = environment.host
  private baseUrl: string = `${this.host}:8070/api`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/FamilleArticle`);
  }
  addFamille(familleData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/FamilleArticle`, familleData);
  }
  updateFamille(id : number ,famille: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/FamilleArticle/${id}`, famille);
  }
  delete(id:number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/FamilleArticle/${id}`);
  }
}
