import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, LoadingController } from '@ionic/angular';
import { AgentService } from 'src/app/services/agent.service';
import { TirasseService } from 'src/app/services/tirasse.service';

@Component({
  selector: 'app-agent-modal',
  templateUrl: './agent-modal.component.html',
  styleUrls: ['./agent-modal.component.scss'],
})
export class AgentModalComponent implements OnInit {
  @Input() agent: any = null;
  registrationForm!: FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off-outline';
  confirmPasswordType: string = 'password';
  confirmPasswordIcon: string = 'eye-off-outline';
  selectedFile: File | null = null;
  tirasses: any[] = [];
  isEditMode: boolean = false;
  modalTitle: string = 'Add Agent';
  buttonTitle: string = 'ADD AGENT';

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private agentService: AgentService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private tirasseService: TirasseService
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern("^[0-9]{8}$")]],
      adresse: ['', Validators.required],
      motDePasse: [''],
      confirmPassword: [''],
      idTirasse: ['',Validators.required]
    }, { validators: this.passwordMatchValidator });

    this.getTirasses();
    if (this.agent) {
      this.isEditMode = true;
      this.modalTitle = 'Edit Agent';
      this.buttonTitle = 'UPDATE AGENT';
      this.preFillForm(this.agent);
    }
  }

  preFillForm(agent: any) {
    this.registrationForm.patchValue({
      prenom: agent.prenom,
      nom: agent.nom,
      email: agent.email,
      telephone: agent.telephone,
      adresse: agent.adresse,
      idTirasse: agent.idTirasse
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('motDePasse');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;
      return password === confirmPassword ? null : { mismatch: true };
    } else {
      return { mismatch: true };
    }
  }

  async onSignUp() {
    if (this.registrationForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Please wait...',
        spinner: 'crescent',
        translucent: true
      });
      await loading.present();

      const formData = new FormData();
      if (this.agent) {
        formData.append('id', this.agent.id);
      }
      Object.keys(this.registrationForm.value).forEach(key => {
        formData.append(key, this.registrationForm.value[key]);
      });
      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      if (this.isEditMode) {
        this.agentService.updateAgent(this.agent.id, formData).subscribe(
          async (response) => {
            console.log('Update successful:', response);
            await loading.dismiss();
            const alert = await this.alertController.create({
              header: 'Update Successful!',
              message: 'You have successfully updated the agent.',
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
        this.agentService.createAgent(formData).subscribe(
          async (response) => {
            await loading.dismiss();
            const alert = await this.alertController.create({
              header: 'Agent Created Successfully!',
              message: 'You have successfully created a new agent.',
              buttons: ['OK']
            });
            await alert.present();
            await alert.onDidDismiss();
            this.modalController.dismiss({ created: true });
          },
          async (error) => {
            console.error('Registration error:', error);
            await loading.dismiss();
            const alert = await this.alertController.create({
              header: 'Registration Error',
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
        message: 'Please fill in all required fields and ensure passwords match.',
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

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
    } else if (field === 'confirmPassword') {
      this.confirmPasswordType = this.confirmPasswordType === 'text' ? 'password' : 'text';
      this.confirmPasswordIcon = this.confirmPasswordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  getTirasses() {
    this.tirasseService.getAll().subscribe(tirasses => {
      this.tirasses = tirasses.filter(tirasse => tirasse.agent == null);
    });
  }
}
