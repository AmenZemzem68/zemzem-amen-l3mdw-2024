import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  public host = environment.host
  private baseUrl: string = `${this.host}:8070/api`;
  private commandUpdated = new BehaviorSubject<any>(null);
  commandUpdated$ = this.commandUpdated.asObservable();

  constructor(private http: HttpClient) { }

  // Commande CRUD operations

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Commande`);
  }
  createCommand(commandData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Commande`, commandData);
  }

  getCommandes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Commande`);
  }

  updateCommande(commande: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Commande/${commande.id}`, commande);
  }

  deleteCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Commande/${id}`);
  }

  // LigneCommande CRUD operations

  addLigneCommande(lineData: any): void {
    this.http.post(`${this.baseUrl}/LigneCommande`, lineData).subscribe(response => {
      this.commandUpdated.next(response);
    });
  }

  getLignesCommande(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/LigneCommande`);
  }

  updateLigneCommande(ligneCommande: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/LigneCommande/${ligneCommande.id}`, ligneCommande);
  }

  deleteLigneCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/LigneCommande/${id}`);
  }
  updateCommandeState(id: number, newState: string): Observable<any> {
    const updatedCommande = { id: id, etat: newState };
  
    return this.http.put<any>(`${this.baseUrl}/Commande/updateState/${updatedCommande.id}`, updatedCommande);
  }
}
