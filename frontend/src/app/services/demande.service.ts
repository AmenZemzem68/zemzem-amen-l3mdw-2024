import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http : HttpClient) { }
  public host = environment.host
  private baseUrl: string = `${this.host}:8070/api`;

  addDemande(demande: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Demande`, demande);
  }
  deleteDemande(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Demande/${id}`);
  }
}
