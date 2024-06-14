import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AgentService } from 'src/app/services/agent.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  id!: number;
  nom!: string ;
  prenom!: string;
  photoUrl!: string;
  role!: string;
  activeItem: string = '';
  isAdmin: boolean = false;
  isAgent: boolean = false;
  isClient: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private menuController: MenuController,
    private agentService: AgentService
  ) { }

  ngOnInit() {
    this.authService.data$.subscribe(data => {
      if (data) {
        this.id = data.id || 0;
        this.nom = data.nom || '';
        this.prenom = data.prenom || '';
        this.photoUrl = data.image ? `data:image/jpeg;base64,${data.image}` : '';
        this.role=data.role;
        switch(this.role)
        {
          case "Admin":
            this.isAdmin = true;
          break;
          case "Agent":
            this.isAgent = true;
          break;
          case "Client":
            this.isClient = true;
          break;
        }
      }
    });
  }
  private clearUserData() {
    this.id = 0;
    this.nom = '';
    this.prenom = '';
    this.photoUrl = '';
    this.isAgent = false;
    this.isAdmin = false;
    this.isClient = false;
  }

  navigateTo(route: string) {
    this.activeItem = route;
    this.menuController.close();
    this.router.navigate([`/${route}`]);
  }

  logout() {
    this.clearUserData();
    this.menuController.close();
    this.authService.logout();
  }
}
