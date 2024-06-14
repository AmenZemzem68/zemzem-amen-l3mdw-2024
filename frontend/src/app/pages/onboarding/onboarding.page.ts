import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FacebookLogin } from '@capacitor-community/facebook-login';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  public host = environment.host
  private user: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private menu: MenuController,
    private http: HttpClient
  ) {
    //GoogleAuth.init();
  }

  ngOnInit() {
    this.menu.swipeGesture(false);
    if(this.authService.isLoggedIn() && this.authService.getRoleFromToken() == "client")
      {
        this.router.navigateByUrl("/home");
      }
      if(this.authService.isLoggedIn() && this.authService.getRoleFromToken() == "admin")
      {
        this.router.navigateByUrl("/dashboard");
      }
      if(this.authService.isLoggedIn() && this.authService.getRoleFromToken() == "agent")
        {
          this.router.navigateByUrl("/agentui");
        }
  }

  async facebookLogin() {
    const FACEBOOK_PERMISSIONS = [
      'email',
      'user_birthday',
      'user_photos',
      'user_gender',
      'user_location',
      'public_profile',
    ];
  
    const result = await FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
  
    if (result.accessToken) {
      const profileInfo = await this.fetchFacebookProfile(result.accessToken.token);
      const [firstName, lastName] = profileInfo.name.split(' ');
  
      const userProfile = {
        firstName: firstName,
        lastName: lastName,
        email: profileInfo.email,
        location: profileInfo.location,
        pictureUrl: profileInfo.picture.data.url
      };
  
      const email = userProfile.email;
      const checkEmailUrl = `http://192.168.77.211:8070/api/Auth/check-email`;
  
      try {
        const response: any = await this.http.post(checkEmailUrl, { email }).toPromise();  
        if (response.exists) {
          this.authService.login({ email, password: 'defaultPassword' }, true).subscribe(
            response => {
              this.authService.storeToken(response.token);
              this.router.navigate(['/home']);
            },
            error => {
              console.error('Login failed', error);
            }
          );
        } else {
          const formData = new FormData();
          formData.append('Nom', userProfile.lastName);
          formData.append('Prenom', userProfile.firstName);
          formData.append('Email', userProfile.email);
          formData.append('Adresse', userProfile.location ? userProfile.location.name : '');
          formData.append('Telephone', '');
          formData.append('MotDePasse', 'defaultPassword');
  
          if (userProfile.pictureUrl) {
            const response = await fetch(userProfile.pictureUrl);
            const blob = await response.blob();
            formData.append('Image', new File([blob], 'profile.jpg'));
          }
  
          this.authService.register(formData).subscribe(
            response => {
              this.authService.login({ email: email, password: 'defaultPassword' }, true).subscribe(
                response => {
                  this.authService.storeToken(response.token);
                  this.router.navigate(['/home']);
                },
                error => {
                  console.error('Login failed', error);
                }
              );
            },
            error => {
              console.error('Registration failed', error);
            }
          );
        }
      } catch (error) {
        console.error('Error checking email', error);
      }
    } else {
      console.error('Facebook login failed');
    }
  }
  

  async fetchFacebookProfile(accessToken: string) {
    const response = await fetch(`https://graph.facebook.com/me?fields=name,email,picture,location&access_token=${accessToken}`);
    const data = await response.json();
    return data;
  }

  async signIn() {
    GoogleAuth.initialize();
    this.user = await GoogleAuth.signIn();
    console.log('user : ', this.user);
    const userProfile = {
      firstName: this.user.familyName,
      lastName: this.user.givenName,
      email: this.user.email,
      location: "",
      pictureUrl: this.user.imageUrl
    };

    const email = userProfile.email;
    const checkEmailUrl = `http://192.168.77.211:8070/api/Auth/check-email`;

    try {
      const response: any = await this.http.post(checkEmailUrl, { email }).toPromise();  
      if (response.exists) {
        this.authService.login({ email, password: 'defaultPassword' }, true).subscribe(
          response => {
            this.authService.storeToken(response.token);
            this.router.navigate(['/home']);
          },
          error => {
            console.error('Login failed', error);
          }
        );
      } else {
        const formData = new FormData();
        formData.append('Nom', userProfile.lastName);
        formData.append('Prenom', userProfile.firstName);
        formData.append('Email', userProfile.email);
        formData.append('Adresse', 'Boumhal');
        formData.append('Telephone', '27856344');
        formData.append('MotDePasse', 'defaultPassword');

        if (userProfile.pictureUrl) {
          const response = await fetch(userProfile.pictureUrl);
          const blob = await response.blob();
          formData.append('Image', new File([blob], 'profile.jpg'));
        }

        this.authService.register(formData).subscribe(
          response => {
            this.authService.login({ email: email, password: 'defaultPassword' }, true).subscribe(
              response => {
                this.authService.storeToken(response.token);
                this.router.navigate(['/home']);
              },
              error => {
                console.error('Login failed', error);
              }
            );
          },
          error => {
            console.error('Registration failed', error);
          }
        );
      }
    } catch (error) {
      console.error('Error checking email', error);
    }
  }
}
