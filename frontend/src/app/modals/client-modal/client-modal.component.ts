import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, LoadingController } from '@ionic/angular';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.scss'],
})
export class ClientModalComponent implements OnInit {
  @Input() client: any = null;
  clientForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private clientService: ClientService,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) {}

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern("^[0-9]{8}$")]],
      adresse: ['', Validators.required],
    });

    if (this.client) {
      this.preFillForm(this.client);
    }
  }

  preFillForm(client: any) {
    this.clientForm.patchValue({
      prenom: client.prenom,
      nom: client.nom,
      email: client.email,
      telephone: client.telephone,
      adresse: client.adresse,
    });
  }

  async onUpdate() {
    if (this.clientForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Please wait...',
        spinner: 'crescent',
        translucent: true
      });
      await loading.present();

      const formData = new FormData();
      if (this.client) {
        formData.append('id', this.client.id);
      }
      Object.keys(this.clientForm.value).forEach(key => {
        formData.append(key, this.clientForm.value[key]);
      });
      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      const clientId = this.client ? this.client.id : null;
      this.clientService.updateClient(clientId, formData).subscribe(
        async (response) => {
          console.log('Update successful:', response);
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Update Successful!',
            message: 'You have successfully updated the client.',
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
      const alert = await this.alertController.create({
        header: 'Invalid Form',
        message: 'Please fill in all required fields and ensure data is correct.',
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
