import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { ModalController } from '@ionic/angular';
import { ArticleModalComponent } from 'src/app/modals/article-modal/article-modal.component';
import { AlertController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-manage-articles',
  templateUrl: './manage-articles.page.html',
  styleUrls: ['./manage-articles.page.scss'],
})
export class ManageArticlesPage implements OnInit {

  id: number = 0;
  photoUrl: string = '';
  articles: any[] = [];
  articleColumns: any[] = [];
  articleSearchTerm: string = '';
  filteredArticles: any[] = [];

  constructor(
    private articleService: ArticleService,
    private modalController: ModalController,
    private alertController: AlertController,
    private adminService: AdminService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.articleColumns = [
      { key: 'id', title: 'Id' },
      { key: 'image', title: 'Image', type: 'image' },
      { key: 'libelle', title: 'Lable' },
      { key: 'prixVente', title: 'Price' },
      { key: 'famille.libelle', title: 'Category' },
    ];
    this.getArticles();
    this.refreshUserData();
    this.authService.getTokenRefreshes().subscribe(() => {
      this.refreshUserData();
    });
  }
  async openArticleModal(article?: any) {
    const modal = await this.modalController.create({
      component: ArticleModalComponent,
      componentProps: { article }
    });
    modal.onDidDismiss().then(() => {
      this.getArticles();
    });
    return await modal.present();
  }
  getArticles() {
    this.articleService.getAll().subscribe(articles => {
      this.articles = articles;
      this.filteredArticles = articles;
    });
  }
  filterArticles() {
    this.filteredArticles = this.articles.filter(article =>
      article.libelle.toLowerCase().includes(this.articleSearchTerm.toLowerCase())
    );
  }
  async onDeleteArticle(article: any) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `Are you sure you want to delete article ${article.libelle}?`,
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
            this.articleService.delete(article.id).subscribe(() => {
              this.articles = this.articles.filter(a => a.id !== article.id);
              this.filterArticles();
            });
          }
        }
      ]
    });
  
    await alert.present();
  }
  onEditArticle(article: any) {
    this.openArticleModal(article);
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
