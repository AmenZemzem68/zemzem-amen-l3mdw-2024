import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastController, AlertController, MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private menuController: MenuController,
    private alertController: AlertController
  ) { }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    if (this.authService.isLoggedIn()) {
      const expectedRole = route.data['expectedRole'];
      const userRole = this.authService.getRoleFromToken();
      if (userRole === expectedRole) {
        this.menuController.enable(true, 'main-menu');
        return true;
      } else {
        const alert = await this.alertController.create({
          header: 'Unauthorized',
          message: 'You do not have permission to access this page.',
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigateByUrl(this.router.url); 
        return false;
      }
    } else {
      this.menuController.enable(false, 'main-menu');
      const alert = await this.alertController.create({
        header: 'Unauthorized',
        message: 'You must be logged in to access this page.',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigateByUrl(this.router.url); 
      return false;
    }
  }
}
