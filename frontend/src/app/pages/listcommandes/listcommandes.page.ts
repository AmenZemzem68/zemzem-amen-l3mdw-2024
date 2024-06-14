import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-listcommandes',
  templateUrl: './listcommandes.page.html',
  styleUrls: ['./listcommandes.page.scss'],
})
export class ListcommandesPage implements OnInit {
  id: number = 0;
  nom: string = '';
  prenom: string = '';
  email: string = '';
  telephone: string = '';
  adresse: string = '';
  photoUrl: string = '';
  commandes: any[] = [];
  filtredLignsCommande: any[] = [];
  commande: any;
  isModalOpen = false;

  constructor(private authService : AuthService , private clientService : ClientService) {}

  ngOnInit() {
    this.authService.getTokenRefreshes().subscribe(() => {
      this.refreshUserData();
    });
    this.refreshUserData();
  }

  private refreshUserData() {
    this.id = this.authService.getIdFromToken();
    this.clientService.getClientById(this.id).subscribe(user => {
      this.nom = user.nom;
      this.prenom = user.prenom;
      this.email = user.email;
      this.telephone = user.telephone;
      this.adresse = user.adresse;
      if (user.image) {
        this.photoUrl = `data:image/jpeg;base64,${user.image}`;
      }
      user.role="Client";
      this.commandes=user.commandes;
      this.authService.setData(user);
    });
  }

  getEtatClass(etat: string): string {
    switch (etat) {
      case 'pending':
        return 'etat-warning';
      case 'ready':
        return 'etat-success';
      case 'removed':
        return 'etat-danger';
      default:
        return '';
    }
  }

  openModal(commande: any) {
    this.commande = commande;
    this.isModalOpen = true;
    this.filtredLignsCommande = commande.lignesCommande;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
