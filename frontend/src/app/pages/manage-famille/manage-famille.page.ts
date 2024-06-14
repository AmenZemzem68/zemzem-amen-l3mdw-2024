import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ModalController } from '@ionic/angular';
import { FamilleArticleModalComponent } from 'src/app/modals/famille-article-modal/famille-article-modal.component';
import { AlertController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-manage-famille',
  templateUrl: './manage-famille.page.html',
  styleUrls: ['./manage-famille.page.scss'],
})
export class ManageFamillePage implements OnInit {

  id: number = 0;
  photoUrl: string = '';
  telephone: string = '';
  familleArticles: any[] = [];
  familleArticleColumns: any[] = [];
  familleArticleSearchTerm: string = '';
  filteredFamilleArticles: any[] = [];
  constructor(
    private categoryService: CategoryService,
    private modalController: ModalController,
    private alertController: AlertController,
    private adminService: AdminService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.familleArticleColumns = [
      { key: 'id', title: 'Id' },
      { key: 'image', title: 'Image', type: 'image' },
      { key: 'libelle', title: 'Lable' }
    ];
    this.getFamilleArticles();
    this.refreshUserData();
    this.authService.getTokenRefreshes().subscribe(() => {
      this.refreshUserData();
    });
  }
  async openFamilleModal(famille?:any) {
    const modal = await this.modalController.create({
      component: FamilleArticleModalComponent,
      componentProps: { famille }
    });
    modal.onDidDismiss().then(() => {
      this.getFamilleArticles();
    });
    return await modal.present();
  }
  getFamilleArticles() {
    this.categoryService.getAll().subscribe(familleArticles => {
      this.familleArticles = familleArticles;
      this.filteredFamilleArticles = familleArticles;
    });
  }
  filterFamilleArticles() {
    this.filteredFamilleArticles = this.familleArticles.filter(familleArticle =>
      familleArticle.libelle.toLowerCase().includes(this.familleArticleSearchTerm.toLowerCase())
    );
  }
  async onDeleteFamilleArticle(familleArticle: any) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `Are you sure you want to delete famille article ${familleArticle.libelle}?`,
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
            this.categoryService.delete(familleArticle.id).subscribe(() => {
              this.familleArticles = this.familleArticles.filter(f => f.id !== familleArticle.id);
              this.filterFamilleArticles();
            });
          }
        }
      ]
    });
  
    await alert.present();
  }
  onEditFamille(famille: any) {
    this.openFamilleModal(famille);
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
