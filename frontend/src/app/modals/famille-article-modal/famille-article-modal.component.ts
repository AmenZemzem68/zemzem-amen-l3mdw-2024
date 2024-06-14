import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-famille-article-modal',
  templateUrl: './famille-article-modal.component.html',
  styleUrls: ['./famille-article-modal.component.scss'],
})
export class FamilleArticleModalComponent implements OnInit {
  @Input() famille: any = null;
  familleForm!: FormGroup;
  selectedFile: File | null = null;
  isEditMode: boolean = false;
  modalTitle: string = 'Add Category';
  buttonTitle: string = 'ADD CATEGORY';

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private categoryService: CategoryService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.familleForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      photo: [null]
    });

    if (this.famille) {
      this.isEditMode = true;
      this.modalTitle = 'Edit Category';
      this.buttonTitle = 'UPDATE CATEGORY';
      this.preFillForm(this.famille);
    }
  }

  preFillForm(famille: any) {
    this.familleForm.patchValue({
      libelle: famille.libelle
    });
  }

  async onAddFamille() {
    if (this.familleForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Please wait...',
        spinner: 'crescent',
        translucent: true
      });
      await loading.present();

      const formData = new FormData();
      if (this.isEditMode && this.famille) {
        formData.append('id', this.famille.id);
      }
      formData.append('libelle', this.familleForm.get('libelle')?.value);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      if (this.isEditMode) {
        this.categoryService.updateFamille(this.famille.id, formData).subscribe(
          async (response) => {
            console.log('Update successful:', response);
            await loading.dismiss();
            const alert = await this.alertController.create({
              header: 'Update Successful!',
              message: 'You have successfully updated the category.',
              buttons: ['OK']
            });
            await alert.present();
            await alert.onDidDismiss();
            this.modalController.dismiss({ updated: true });
          },
          async (error) => {
            console.error('Update error:', error);
            await loading.dismiss();
            const alert = await this.alertController.create({
              header: 'Update Error',
              message: error.message,
              buttons: ['OK']
            });
            await alert.present();
          }
        );
      } else {
        this.categoryService.addFamille(formData).subscribe(
          async (response) => {
            console.log('Famille added successfully', response);
            await loading.dismiss();
            const alert = await this.alertController.create({
              header: 'Category Added Successfully!',
              message: 'You have successfully added a new category.',
              buttons: ['OK']
            });
            await alert.present();
            await alert.onDidDismiss();
            this.modalController.dismiss({ created: true });
          },
          async (error) => {
            console.error('Error adding famille', error);
            await loading.dismiss();
            const alert = await this.alertController.create({
              header: 'Addition Error',
              message: error.message,
              buttons: ['OK']
            });
            await alert.present();
          }
        );
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Invalid Form',
        message: 'Please fill in all required fields.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
