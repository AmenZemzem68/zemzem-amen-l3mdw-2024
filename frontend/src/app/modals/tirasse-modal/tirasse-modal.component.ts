import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { TirasseService } from 'src/app/services/tirasse.service';

@Component({
  selector: 'app-tirasse-modal',
  templateUrl: './tirasse-modal.component.html',
  styleUrls: ['./tirasse-modal.component.scss'],
})
export class TirasseModalComponent implements OnInit {

  @Input() tirasse: any;
  tirasseForm: FormGroup;
  isEditMode: boolean = false;
  modalTitle: string = 'Add Tirasse';
  buttonTitle: string = 'ADD TIRASSE';

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private tirasseService: TirasseService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.tirasseForm = this.formBuilder.group({
      nom: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.tirasse) {
      this.isEditMode = true;
      this.modalTitle = 'Edit Tirasse';
      this.buttonTitle = 'UPDATE TIRASSE';
      this.preFillForm(this.tirasse);
    }
  }

  preFillForm(tirasse: any) {
    this.tirasseForm.patchValue({
      nom: tirasse.nom
    });
  }

  async onAddOrUpdateTirasse() {
    if (this.tirasseForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Please wait...',
        spinner: 'crescent',
        translucent: true
      });
      await loading.present();

      const formData = new FormData();
      formData.append('id', this.tirasse.id);
      formData.append('nom', this.tirasseForm.get('nom')?.value);

      const serviceCall = this.isEditMode ?
        this.tirasseService.updateTirasse(this.tirasse.id, formData) :
        this.tirasseService.addTirasse(formData);

      serviceCall.subscribe(
        async (response) => {
          await this.showAlert('Success', `Tirasse ${this.isEditMode ? 'updated' : 'added'} successfully`);
          this.dismiss();
        },
        async (error) => {
          console.error('Error processing request', error);
          await this.showAlert('Error', `Failed to ${this.isEditMode ? 'update' : 'add'} tirasse`);
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
}
