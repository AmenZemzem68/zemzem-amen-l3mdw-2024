import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { VerticalChartComponent } from 'src/app/components/vertical-chart/vertical-chart.component';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  id: number = 0;
  photoUrl: string = '';
  commandes: any[] = [];
  commandeColumns: any[] = [];
  commandesearchTerm: string = '';
  filteredcommandes: any[] = [];


  constructor(
    private authService : AuthService,
    private adminService : AdminService,
    private menu : MenuController,
    private commandeService: CommandeService,
  ) { }

  ngOnInit() {
    this.getcommandes();
    this.commandeColumns = [
      { key: 'id', title: 'Id' },
      { key: 'dateCommande', title: 'Order Date' },
      { key: 'client.nom', title: 'Client Prename' },
      { key: 'client.prenom', title: 'Client Name' },
      { key: 'prixTotal', title: 'Price' },
      { key: 'table.numero', title: 'Table' },
    ];
    this.menu.enable(true);
    this.menu.swipeGesture(true);
    this.refreshUserData();
    this.authService.getTokenRefreshes().subscribe(() => {
      this.refreshUserData();
    });
  }

  private refreshUserData() {
    this.id = this.authService.getIdFromToken();
    this.adminService.getAdminById(this.id).subscribe(user => {
      if (user.image) {
        this.photoUrl = `data:image/jpeg;base64,${user.image}`;
      }
      user.role = "Admin";
      this.authService.setData(user);
    });
  }
  getcommandes() {
    this.commandeService.getAll().subscribe(commandes => {
      this.commandes = commandes;
      this.filteredcommandes = commandes;
    });
  }
  filtercommandes() {
    this.filteredcommandes = this.commandes.filter(client =>
      client.nom.toLowerCase().includes(this.commandesearchTerm.toLowerCase()) ||
      client.prenom.toLowerCase().includes(this.commandesearchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(this.commandesearchTerm.toLowerCase()) ||
      client.adresse.toLowerCase().includes(this.commandesearchTerm.toLowerCase()) ||
      client.telephone.toLowerCase().includes(this.commandesearchTerm.toLowerCase())
    );
  }
  }
