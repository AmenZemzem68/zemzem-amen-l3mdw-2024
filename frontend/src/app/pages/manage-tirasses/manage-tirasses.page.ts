import { Component, OnInit } from '@angular/core';
import { TirasseService } from 'src/app/services/tirasse.service';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { TirasseModalComponent } from 'src/app/modals/tirasse-modal/tirasse-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-tirasses',
  templateUrl: './manage-tirasses.page.html',
  styleUrls: ['./manage-tirasses.page.scss'],
})
export class ManageTirassesPage implements OnInit {

  id: number = 0;
  photoUrl: string = '';
  tirasses: any[] = [];
  tirasseColumns: any[] = [];
  tirasseSearchTerm: string = '';
  filteredTirasses: any[] = [];

  constructor(
    private tirasseService: TirasseService,
    private modalController: ModalController,
    private alertController: AlertController,
    private adminService: AdminService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.tirasseColumns = [
      { key: 'id', title: 'Id' },
      { key: 'nom', title: 'Name' },
      { key: 'agent.prenom', title: 'Agent' },
    ];
    this.getTirasses();
    this.refreshUserData();
    this.authService.getTokenRefreshes().subscribe(() => {
      this.refreshUserData();
    });
  }
  async openTirasseModal(tirasse?:any) {
    const modal = await this.modalController.create({
      component: TirasseModalComponent,
      componentProps: { tirasse }
    });
    modal.onDidDismiss().then(() => {
      this.getTirasses();
    });
    return await modal.present();
  }
  getTirasses() {
    this.tirasseService.getAll().subscribe(tirasses => {
      this.tirasses = tirasses;
      this.filteredTirasses = tirasses;
    });
  }
  filterTirasses() {
    this.filteredTirasses = this.tirasses.filter(tirasse =>
      tirasse.nom.toLowerCase().includes(this.tirasseSearchTerm.toLowerCase())
    );
  }
  async onDeleteTirasse(tirasse: any) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `Are you sure you want to delete tirasse ${tirasse.nom}?`,
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
            this.tirasseService.delete(tirasse.id).subscribe(() => {
              this.tirasses = this.tirasses.filter(t => t.id !== tirasse.id);
              this.filterTirasses();
            });
          }
        }
      ]
    });
  
    await alert.present();
  }
  onEditTirasse(tirasse: any) {
    this.openTirasseModal(tirasse);
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
}
