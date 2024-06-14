
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLogin } from '@capacitor-community/facebook-login';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(private router : Router , private menuController : MenuController) {
    this.initializeApp();
  }

  ngOnInit() {
    this.initializeApp();
  }

  async initializeApp() {
    await FacebookLogin.initialize({ appId: '828167739127229' });
  }
  goToMenu() {
    this.router.navigateByUrl('/home');
    this.menuController.enable(true, 'main-menu');
  }

  goToProfile() {
    this.router.navigateByUrl('/profil');
    this.menuController.enable(true, 'main-menu');
  }

  goToAllOrder() {
    this.router.navigateByUrl('/listcommandes');
    this.menuController.enable(true, 'main-menu');
  }
}
