import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ClientModalComponent } from 'src/app/modals/client-modal/client-modal.component';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.page.html',
  styleUrls: ['./manage-clients.page.scss'],
})
export class ManageClientsPage implements OnInit {
  
  id: number = 0;
  photoUrl: string = '';
  telephone: string = '';
  clients: any[] = [];
  clientColumns: any[] = [];
  clientSearchTerm: string = '';
  filteredClients: any[] = [];

  constructor(
    private clientService: ClientService,
    private modalController: ModalController,
    private alertController: AlertController,
    private adminService: AdminService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getClients();
    this.clientColumns = [
      { key: 'id', title: 'Id' },
      { key: 'image', title: 'Image', type: 'image' },
      { key: 'nom', title: 'Name' },
      { key: 'prenom', title: 'Prename' },
      { key: 'email', title: 'Email' },
      { key: 'adresse', title: 'Adresse' },
      { key: 'telephone', title: 'Phone' }
    ];
    this.refreshUserData();
    this.authService.getTokenRefreshes().subscribe(() => {
      this.refreshUserData();
    });
  }

  async openClientModal(client?: any) {
    const modal = await this.modalController.create({
      component: ClientModalComponent,
      componentProps: { client }
    });
    modal.onDidDismiss().then(() => {
      this.getClients;
    });
    return await modal.present();
  }
  getClients() {
    this.clientService.getAll().subscribe(clients => {
      this.clients = clients;
      this.filteredClients = clients;
    });
  }
  filterClients() {
    this.filteredClients = this.clients.filter(client =>
      client.nom.toLowerCase().includes(this.clientSearchTerm.toLowerCase()) ||
      client.prenom.toLowerCase().includes(this.clientSearchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(this.clientSearchTerm.toLowerCase()) ||
      client.adresse.toLowerCase().includes(this.clientSearchTerm.toLowerCase()) ||
      client.telephone.toLowerCase().includes(this.clientSearchTerm.toLowerCase())
    );
  }
  async onDeleteClient(client: any) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `Are you sure you want to delete client ${client.nom}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Delete canceled');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.clientService.delete(client.id).subscribe(() => {
              this.clients = this.clients.filter(c => c.id !== client.id);
              this.filterClients();
            });
          }
        }
      ]
    });
  
    await alert.present();
  }
  onEditClient(client: any) {
    this.openClientModal(client);
  } 
  private refreshUserData() {
    this.id = this.authService.getIdFromToken();
    this.adminService.getAdminById(this.id).subscribe(user => {
      this.telephone = user.telephone;
      if (user.image) {
        this.photoUrl = `data:image/jpeg;base64,${user.image}`;
      }
      user.role = "Admin";
      this.authService.setData(user);
    });
  }
}
