import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.scss'],
})
export class ArticleModalComponent implements OnInit {
  @Input() article: any;
  articleForm: FormGroup;
  selectedFile: File | null = null;
  familleArticles: any[] = [];
  isEditMode: boolean = false;
  modalTitle: string = 'Add Article';
  buttonTitle: string = 'ADD ARTICLE';

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.articleForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      prixVente: ['', Validators.required],
      description: ['', Validators.required],
      photo: [null],
      idFamille: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getFamilleArticles();
    if (this.article) {
      this.isEditMode = true;
      this.modalTitle = 'Edit Article';
      this.buttonTitle = 'UPDATE ARTICLE';
      this.preFillForm(this.article);
    }
  }

  getFamilleArticles() {
    this.categoryService.getAll().subscribe(familleArticles => {
      this.familleArticles = familleArticles;
    });
  }

  preFillForm(article: any) {
    this.articleForm.patchValue({
      libelle: article.libelle,
      prixVente: article.prixVente,
      description: article.description,
      idFamille: article.idFamille
    });
  }

  async onAddOrUpdateArticle() {
    if (this.articleForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Please wait...',
        spinner: 'crescent',
        translucent: true
      });
      await loading.present();

      const formData = new FormData();
      formData.append('libelle', this.articleForm.get('libelle')?.value);
      formData.append('prixVente', this.articleForm.get('prixVente')?.value);
      formData.append('description', this.articleForm.get('description')?.value);
      formData.append('idFamille', this.articleForm.get('idFamille')?.value);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      const serviceCall = this.isEditMode ?
        this.articleService.updateArticle(this.article.id, formData) :
        this.articleService.addArticle(formData);

      serviceCall.subscribe(
        async (response) => {
          console.log(`${this.isEditMode ? 'Updated' : 'Added'} successfully`, response);
          await this.showAlert('Success', `Article ${this.isEditMode ? 'updated' : 'added'} successfully`);
          this.dismiss();
        },
        async (error) => {
          console.error('Error processing request', error);
          await this.showAlert('Error', `Failed to ${this.isEditMode ? 'update' : 'add'} article`);
        },
        async () => {
          await loading.dismiss();
        }
      );
    } else {
      await this.showAlert('Invalid Form', 'Please fill in all required fields.');
    }
  }
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
}
