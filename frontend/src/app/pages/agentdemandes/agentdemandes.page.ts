import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentService } from 'src/app/services/agent.service';
import { AuthService } from 'src/app/services/auth.service';
import { DemandeService } from 'src/app/services/demande.service';

@Component({
  selector: 'app-agentdemandes',
  templateUrl: './agentdemandes.page.html',
  styleUrls: ['./agentdemandes.page.scss'],
})
export class AgentdemandesPage implements OnInit {
  id: number = 0;
  nom: string = '';
  prenom: string = '';
  photoUrl: string = '';
  demandes: any[] = [];
  filteredDemandes: any[] = [];

  constructor(private agentService: AgentService,private authService: AuthService , private demandesService : DemandeService) {}

  ngOnInit() {
    this.refreshUserData();
    this.authService.getTokenRefreshes().subscribe(() => {
      this.refreshUserData();
    });
  }

  private refreshUserData() {
    this.id = this.authService.getIdFromToken();
    this.agentService.getAgentById(this.id).subscribe(user => {
      this.nom = user.nom;
      this.prenom = user.prenom;
      if (user.image) {
        this.photoUrl = `data:image/jpeg;base64,${user.image}`;
      }
      user.role="Agent";
      if (user.tirasse && user.tirasse.tables) {
        this.demandes = user.tirasse.tables.flatMap((table: any) => {
          return (table.demandes || []).map((demande: any) => ({
            ...demande,
            table: table
          }));
        });
      }
      user.demandes = this.demandes.length;
      this.authService.setData(user);
    });
  }

  deleteDemande(id: number) {
    this.demandesService.deleteDemande(id).subscribe({
      next: () => {
        this.demandes = this.demandes.filter(demande => demande.id !== id);
      },
      error: (error) => console.error('Failed to delete demande', error)
    });
  }
}
