import { Component, HostListener, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { CategoryService } from 'src/app/services/category.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { ArticleService } from 'src/app/services/article.service';
import { CommandeService } from 'src/app/services/commande.service';
import { AlertController, ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { TableService } from 'src/app/services/table.service';
import { DemandeService } from 'src/app/services/demande.service';
import { ListeFavorisService } from 'src/app/services/liste-favoris.service';

register();

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  id: number = 0;
  nom: string = '';
  prenom: string = '';
  adresse: string = '';
  photoUrl: string = '';
  user!: any;
  categories: any[] = [];
  products: any[] = [];
  tables: any[] = [];
  filteredProducts: any[] = [];
  activeCategoryId: number | null = null;
  selectedProduct: any;
  isModalOpen = false;
  commands: any[] = [];
  filteredCommands: any[] = [];
  currentCommande: any;
  searchQuery: string = '';
  chosenTable: number | null = null;
  slidesPerView: number = 4.1;

  constructor(
    private alertController: AlertController,
    private catService: CategoryService,
    private authService: AuthService,
    private clientService: ClientService,
    private artService: ArticleService,
    private commandeService: CommandeService,
    private menu: MenuController,
    private tableService: TableService,
    private demandeService: DemandeService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.menu.enable(true);
    this.menu.swipeGesture(true);
    this.authService.getTokenRefreshes().subscribe(() => {
      this.refreshUserData();
    });
    this.refreshUserData();
    this.loadCategories();
    this.loadArticles();
    this.loadTables();
    this.subscribeToDataUpdates();
    this.updateSlidesPerView();
  }

  // User Data Methods
  private refreshUserData() {
    this.authService.data$.subscribe(data => {
      if (data) {
        this.id = data.id || 0;
        this.nom = data.nom || '';
        this.prenom = data.prenom || '';
        this.adresse = data.adresse;
        this.photoUrl = data.image ? `data:image/jpeg;base64,${data.image}` : '';
      }
      else {
        this.id = this.authService.getIdFromToken();
        this.clientService.getClientById(this.id).subscribe(user => {
          this.nom = user.nom;
          this.prenom = user.prenom;
          this.adresse = user.adresse;
          if (user.image) {
            this.photoUrl = `data:image/jpeg;base64,${user.image}`;
          }
          user.role = "Client";
          this.authService.setData(user);
        });
      }
    });
  }

  // Modal Methods
  openProductModal(product: any) {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // Category Methods
  loadCategories() {
    this.catService.getAll().subscribe(
      (data) => {
        this.categories = [{ id: null, libelle: 'All' }, ...data];
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  filterProductsByCategory(category: any): void {
    this.activeCategoryId = category.id;
    if (category.id === null) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = category.articles;
    }
  }

  // Product Methods
  loadArticles() {
    this.artService.getAll().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  filterProducts(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.libelle.toLowerCase().includes(searchTerm)
    );
  }
  getLibelle(id: number): string {
    const product = this.products.find(p => p.id === id);
    return product ? product.libelle : 'Unknown';
  }

  // Command Methods


  async addNewCommand() {
    if (!this.chosenTable) {
      const alert = await this.alertController.create({
        header: 'No Table Selected',
        message: 'Please select a table before adding a new order.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.currentCommande = {
      idClient: this.id,
      idTable: this.chosenTable,
      dateCommande: new Date(),
      lignesCommande: [],
    };
  }

  async addProductToCommand(product: any) {
    if (!this.currentCommande) {
      const alert = await this.alertController.create({
        header: 'No order created',
        message: "Please add a new order by clicking the green button located at the bottom.",
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const newLigneCommande = {
      quantite: 1,
      prixUnitaire: product.prixVente,
      idArticle: product.id,
      note: ''
    };

    this.currentCommande.lignesCommande.push(newLigneCommande);
    this.presentToast("Product Added", "success")
  }


  subscribeToDataUpdates() {
    this.commandeService.commandUpdated$.subscribe(() => {
    });
  }

  async onDelete() {
    if (!this.currentCommande) {
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this order?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Deletion canceled');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.currentCommande = null;
            console.log('Order deleted successfully');
          }
        }
      ]
    });

    await alert.present();
  }


  calculateTotal(): number {
    let total = 0;
    if (this.currentCommande && this.currentCommande.lignesCommande) {
      for (let line of this.currentCommande.lignesCommande) {
        total += line.quantite * line.prixUnitaire;
      }
    }
    return total;
  }


  increaseQuantity(line: any) {
    line.quantite += 1;
    this.commandeService.updateLigneCommande(line);
  }

  decreaseQuantity(line: any) {
    const lineIndex = this.currentCommande.lignesCommande.findIndex((l: any) => l.idArticle === line.idArticle);
    if (lineIndex > -1 && this.currentCommande.lignesCommande[lineIndex].quantite > 1) {
      this.currentCommande.lignesCommande[lineIndex].quantite--;
    } else {
      this.deleteLigneCommande(lineIndex);
    }
  }


  deleteLigneCommande(lineIndex: number) {
    if (lineIndex > -1) {
      this.currentCommande.lignesCommande.splice(lineIndex, 1);
    }
  }


  async confirmCommande() {
    if (!this.currentCommande) {
      const alert = await this.alertController.create({
        header: 'No order to confirm',
        message: 'Please create an order before confirming.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirm Order',
      message: 'Are you sure you want to confirm this order?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.currentCommande.prixTotal = this.calculateTotal();

            this.commandeService.createCommand(this.currentCommande).subscribe(response => {
              this.currentCommande = null;
            }, error => {
              console.error('Error confirming the commande', error);
            });
          }
        }
      ]
    });

    await alert.present();
  }


  loadTables() {
    this.tableService.getAll().subscribe(
      (data) => {
        this.tables = data;
      },
      (error) => {
        console.error('Error fetching line commands', error);
      }
    );
  }

  onTableSelect(event: any) {
    this.chosenTable = event.detail.value;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateSlidesPerView();
  }

  updateSlidesPerView() {
    if (window.innerWidth >= 700) {
      this.slidesPerView = 6;
    } else {
      this.slidesPerView = 4.1;
    }
  }

  async sendDemande(msg: string) {
    if (!this.chosenTable) {
      const alert = await this.alertController.create({
        header: "No table Selected",
        message: "Please select a table before adding a demande",
        buttons: ["Ok"]
      });
      await alert.present();
    }
    else {
      const demande = {
        message: msg,
        idTable: this.chosenTable
      };
      this.demandeService.addDemande(demande).subscribe(() => {
      });
      const alert = await this.alertController.create({
        header: "Demande Sent",
        message: "Your demande is sent, you will get a response soon.",
        buttons: ["Ok"]
      });
      await alert.present();
    }
  }



  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }
}
