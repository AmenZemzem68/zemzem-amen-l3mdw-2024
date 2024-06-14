import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-agentui',
  templateUrl: './agentui.page.html',
  styleUrls: ['./agentui.page.scss'],
})
export class AgentuiPage implements OnInit {
  id: number = 0;
  nom: string = '';
  prenom: string = '';
  adresse: string = '';
  photoUrl: string = '';
  email: string = '';
  telephone: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private menuController: MenuController,
    private agentService : AgentService
  ) { }

  ngOnInit() {
    this.menuController.enable(true);
    this.menuController.swipeGesture(true);
    this.refreshUserData();
    this.authService.getTokenRefreshes().subscribe(() => {
      this.refreshUserData();
    });

  }
  private refreshUserData() {
    this.id = this.authService.getIdFromToken();
    this.agentService.getAgentById(this.id).subscribe(user => {
      this.nom = user.nom;
      this.prenom = user.prenom;
      this.adresse = user.adresse;
      this.email = user.email;
      this.telephone = user.telephone;
      if (user.image) {
        this.photoUrl = `data:image/jpeg;base64,${user.image}`;
      }
      user.role="Agent";
      this.authService.setData(user);
    });
  }

  
  logout() {
    this.authService.logout();
    this.menuController.close();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
