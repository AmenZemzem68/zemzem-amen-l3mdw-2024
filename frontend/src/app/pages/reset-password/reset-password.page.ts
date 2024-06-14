import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassword } from 'src/app/models/reset-password.model';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  resetForm!: FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off-outline';
  confirmPasswordType: string = 'password';
  confirmPasswordIcon: string = 'eye-off-outline';
  emailToReset!: string;
  emailToken!: string;
  resetPasswordObj = new ResetPassword();
  isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private resetService: ResetPasswordService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private menu : MenuController
  ) {}

  ngOnInit() {
    this.menu.swipeGesture(false);
    this.activatedRoute.queryParams.subscribe(params => {
      this.emailToReset = params['email'];
      let uriToken = params['code'] || '';
      this.emailToken = uriToken.replace(/ /g, '+');
    });

    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.confirmPasswordMatchValidator
    });
  }

  confirmPasswordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value
      ? null : { mismatch: true };
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

  async reset() {
    if (this.resetForm.valid) {
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetForm.value.password;
      this.resetPasswordObj.confirmPassword = this.resetForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.emailToken;

      this.isLoading = true;
      const loading = await this.loadingController.create({
        message: 'Please wait...',
        spinner: 'crescent',
        translucent: true,
        backdropDismiss: false
      });
      await loading.present();

      this.resetService.resetPassword(this.resetPasswordObj).subscribe({
        next: async (res) => {
          loading.dismiss();
          this.isLoading = false;
          const toast = await this.toastController.create({
            message: 'Reset is successful',
            duration: 2000,
            color: 'success'
          });
          await toast.present();
          this.router.navigateByUrl("/login");
        },
        error: async (err) => {
          loading.dismiss();
          this.isLoading = false;
          const alert = await this.alertController.create({
            header: 'Reset Failed',
            message: err.error.message,
            buttons: ['OK']
          });
          await alert.present();
        }
      });
    } else {
      const alert = await this.alertController.create({
        header: 'Invalid Form',
        message: 'Please fill in all fields',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
