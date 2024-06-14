import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/app/services/agent.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommandeService } from 'src/app/services/commande.service';


@Component({
  selector: 'app-agentcommandes',
  templateUrl: './agentcommandes.page.html',
  styleUrls: ['./agentcommandes.page.scss'],
})
export class AgentcommandesPage implements OnInit {
  id: number = 0;
  nom: string = '';
  prenom: string = '';
  adresse: string = '';
  photoUrl: string = '';
  email: string = '';
  telephone: string = '';
  commandes: any[] = [];
  commande: any | null = null;
  isModalOpen = false;
  filtredLignsCommande: any[] = [];
  currentTerrasseId: number | null = null;
  agent: any = {};

  constructor(private authService: AuthService, private agentService: AgentService, private commandeService: CommandeService) {}

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
      this.adresse = user.adresse;
      this.email = user.email;
      this.telephone = user.telephone;
      if (user.image) {
        this.photoUrl = `data:image/jpeg;base64,${user.image}`;
      }
      user.role = "Agent";
      if (user.tirasse && user.tirasse.tables) {
        this.commandes = user.tirasse.tables.flatMap((table: any) => {
          return (table.commandes || []).map((commande: any) => ({
            ...commande,
            table: table
          }));
        });
      }
      user.commandes=this.commandes.length;
      this.authService.setData(user);
    });
  }

  confirmCommande(id: number | undefined) {
    if (id !== undefined) {
      this.commandeService.updateCommandeState(id, 'ready').subscribe({
        next: () => {
          if (this.commande) {
            this.commande.etat = 'ready';
          }
          this.refreshUserData();
        },
        error: (error) => console.error('Error updating commande state', error)
      });
    } else {
      console.error('Attempted to confirm a commande with undefined ID');
    }
  }

  cancelCommande(id: number | undefined) {
    if (id !== undefined) {
      this.commandeService.updateCommandeState(id, 'removed').subscribe({
        next: () => {
          if (this.commande) {
            this.commande.etat = 'removed';
          }
          this.refreshUserData();
        },
        error: (error) => console.error('Error updating commande state', error)
      });
    } else {
      console.error('Attempted to cancel a commande with undefined ID');
    }
  }

  getEtatClass(etat: string): string {
    switch (etat) {
      case 'pending': return 'etat-warning';
      case 'ready': return 'etat-success';
      case 'removed': return 'etat-danger';
      default: return '';
    }
  }

  openModal(commande: any): void {
    this.commande = commande;
    this.isModalOpen = true;
    this.filtredLignsCommande = commande.lignesCommande;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
