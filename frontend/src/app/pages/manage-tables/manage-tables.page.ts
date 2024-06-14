import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { TableModalComponent } from 'src/app/modals/table-modal/table-modal.component';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-manage-tables',
  templateUrl: './manage-tables.page.html',
  styleUrls: ['./manage-tables.page.scss'],
})
export class ManageTablesPage implements OnInit {

  id: number = 0;
  photoUrl: string = '';
  telephone: string = '';
  tables: any[] = [];
  tableColumns: any[] = [];
  tableSearchTerm: string = '';
  filteredTables: any[] = [];
  constructor(
    private tableService: TableService,
    private modalController: ModalController,
    private alertController: AlertController,
    private adminService: AdminService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.tableColumns = [
      { key: 'id', title: 'Id' },
      { key: 'numero', title: 'Numbre' },
      { key: 'tirasse.nom', title: 'Terrace' }
    ];
    this.getTables();
    this.refreshUserData();
    this.authService.getTokenRefreshes().subscribe(() => {
      this.refreshUserData();
    });
  }
  async openTableModal(table?:any) {
    const modal = await this.modalController.create({
      component: TableModalComponent,
      componentProps: { table }
    });
    modal.onDidDismiss().then(() => {
      this.getTables();
    });
    return await modal.present();
  }
  getTables() {
    this.tableService.getAll().subscribe(tables => {
      this.tables = tables;
      this.filteredTables = tables;
    });
  }
  filterTables() {
    this.filteredTables = this.tables.filter(table =>
      table.numero.toLowerCase().includes(this.tableSearchTerm.toLowerCase())
    );
  }
  async onDeleteTable(table: any) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `Are you sure you want to delete table ${table.numero}?`,
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
            this.tableService.delete(table.id).subscribe(() => {
              this.tables = this.tables.filter(t => t.id !== table.id);
              this.filterTables();
            });
          }
        }
      ]
    });
  
    await alert.present();
  }
  onEditTable(table: any) {
    this.openTableModal(table);
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
