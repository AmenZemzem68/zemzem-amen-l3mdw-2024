import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  id: number = 0;
  nom: string = '';
  prenom: string = '';
  email: string = '';
  telephone: string = '';
  adresse: string = '';
  photoUrl: string = '';
  updatedUser: any = {};  // Initialize updatedUser

  constructor(
    private authService: AuthService,
    private clientService: ClientService,
  ) { }

  ngOnInit() {
    this.authService.getTokenRefreshes().subscribe(() => {
      this.refreshUserData();
    });
    this.refreshUserData();
  }

  private refreshUserData() {
    this.id = this.authService.getIdFromToken();
    this.clientService.getClientById(this.id).subscribe(user => {
      this.nom = user.nom;
      this.prenom = user.prenom;
      this.email = user.email;
      this.telephone = user.telephone;
      this.adresse = user.adresse;
      if (user.image) {
        this.photoUrl = `data:image/jpeg;base64,${user.image}`;
      }
      user.role="Client";
      this.authService.setData(user);
      this.updatedUser = { ...user };
      this.updatedUser.id = this.id;
    });
  }

  editUserData() {
    const formData = new FormData();
    formData.append('id', this.updatedUser.id.toString());
    formData.append('nom', this.updatedUser.nom);
    formData.append('prenom', this.updatedUser.prenom);
    formData.append('email', this.updatedUser.email);
    formData.append('telephone', this.updatedUser.telephone);
    formData.append('adresse', this.updatedUser.adresse);
    if (this.updatedUser.image) {
      formData.append('image', this.updatedUser.image);
    }

    this.clientService.updateClient(this.id, formData).subscribe(() => {
      this.refreshUserData();
      const modalElement = document.querySelector('ion-modal');
      if (modalElement) {
        modalElement.dismiss();
      }
    }, error => {
      console.error('Update failed', error);
    });
  }
}
