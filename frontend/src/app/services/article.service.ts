import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public host = environment.host
  private baseUrl: string = `${this.host}:8070/api`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Article`);
  }
  addArticle(articleData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Article`, articleData);
  }
  updateArticle(id : number ,article: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Article/${id}`, article);
  }
  getArticleById(id:number):Observable <any>{
    return this.http.get<any>(`${this.baseUrl}/Article/${id}`);
  }
  delete(id:number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Article/${id}`);
  }
}
