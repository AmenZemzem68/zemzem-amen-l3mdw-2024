import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  public host = environment.host
  private baseUrl: string = `${this.host}:8070/api`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Agent`);
  }
  getAgentById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Agent/${id}`);
  }
  createAgent(agentData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Agent/register`, agentData).pipe(take(1));
  }
  updateAgent(id : number ,agent: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Agent/${id}`, agent);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Agent/${id}`);
  }
}
