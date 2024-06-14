import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListeFavorisService {

  private baseUrl: string = "http://192.168.77.211:8070/api";

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ListeFavoris`);
  }
  addFavorite(favorisData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/ListeFavoris`, favorisData);
  }
  updateArticle(id : number ,article: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/ListeFavoris/${id}`, article);
  }
  getArticleById(id:number):Observable <any>{
    return this.http.get<any>(`${this.baseUrl}/ListeFavoris/${id}`);
  }
  delete(id:number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/ListeFavoris/${id}`);
  }
}
