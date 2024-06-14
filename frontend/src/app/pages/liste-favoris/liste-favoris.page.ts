import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-liste-favoris',
  templateUrl: './liste-favoris.page.html',
  styleUrls: ['./liste-favoris.page.scss'],
})
export class ListeFavorisPage implements OnInit {

  id: number = 0;
  nom: string = '';
  prenom: string = '';
  photoUrl: string = '';
  user!:any;
  constructor(    private authService: AuthService,private clientService: ClientService) { }

  ngOnInit() {
    this.authService.getTokenRefreshes().subscribe(() => {
      this.refreshUserData();
    });
    this.refreshUserData();
  }

  private refreshUserData() {
    this.id = this.authService.getIdFromToken();
    this.clientService.getClientById(this.id).subscribe(user => {
      this.user = user;
      this.nom = user.nom;
      this.prenom = user.prenom;
      if (user.image) {
        this.photoUrl = `data:image/jpeg;base64,${user.image}`;
      }
      user.role="Client";
      this.authService.setData(user);
    });
  }

}
