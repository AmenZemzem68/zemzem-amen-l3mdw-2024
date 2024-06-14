import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  public resetPasswordEmail!: string;
  constructor(   private menu : MenuController,private loadingController: LoadingController,private resetService: ResetPasswordService, private toastController: ToastController , private alertController: AlertController) { }

  ngOnInit() {
    this.menu.swipeGesture(false);
  }

  async confirmToSend() {
    const loading = await this.loadingController.create({
        message: 'Sending reset link...',
        spinner: 'crescent',
        translucent: true,
        backdropDismiss: false
    });

    await loading.present();

    this.resetService.sendResetPasswordLink(this.resetPasswordEmail)
        .subscribe({
            next: (res) => {
                loading.dismiss();
                this.resetPasswordEmail = "";
                this.presentToast(res.message, "success");
            },
            error: async (err) => {
                loading.dismiss();
                const message = err.error.message;
                const alert = await this.alertController.create({
                    header: 'Error',
                    message: message,
                    buttons: ['OK']
                });
                await alert.present();
            }
        });
}


  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: color
    });
    toast.present();
  }

}
