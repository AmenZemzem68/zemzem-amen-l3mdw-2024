import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ClientService } from 'src/app/services/client.service';
import { AgentService } from 'src/app/services/agent.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  id!:number;
  credentials!: FormGroup; 
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off-outline';
  isLoading: boolean = false;

  constructor(
   private fb: FormBuilder,
   private authService: AuthService,
   private alertController: AlertController,
   private router: Router,
   private loadingController: LoadingController,
   private menu : MenuController,
   private clientService : ClientService,
   private agentService : AgentService,
   private adminService : AdminService
  ) {}

  ngOnInit() {
    this.menu.swipeGesture(false);
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator()]]
    });
  }
  get email() {
    return this.credentials.get('email');
  }
  get password() {
    return this.credentials.get('password');
  }

  async onLogin() {
    if (this.credentials.valid) {
      const loginPayload = {
        email: this.credentials.value.email,
        MotDePasse: this.credentials.value.password
      };
      this.isLoading = true;
      const loading = await this.loadingController.create({
        message: 'Please wait...',
        spinner: 'crescent',
        translucent: true,
        backdropDismiss: false
      });
      await loading.present();
      this.authService.login(loginPayload,false).subscribe({
        next: (res) => {
          loading.dismiss();
          this.isLoading = false;
          this.authService.storeToken(res.token);
          this.credentials.reset();
          if(res.role=="client"){
            this.id = this.authService.getIdFromToken();
            this.clientService.getClientById(this.id).subscribe(user => {
            user.role = "Client";
            this.authService.setData(user);
            });
            this.router.navigate(['/home']); 
          }
          else if(res.role=="agent"){
            this.id = this.authService.getIdFromToken();
            this.agentService.getAgentById(this.id).subscribe(user => {
            user.role = "Agent";
            this.authService.setData(user);
            });
            this.router.navigate(['/agentui']); 
          }
          else if(res.role=="admin"){
            this.id = this.authService.getIdFromToken();
            this.adminService.getAdminById(this.id).subscribe(user => {
            user.role = "Admin";
            this.authService.setData(user);
            });
            this.router.navigate(['/dashboard']); 
          }
        },
        error: async (err) => {
          loading.dismiss();
          this.isLoading = false;
          const alert = await this.alertController.create({
            header: 'Invalid Form',
            message: err.error.message,
            buttons: ['OK']
          });
          await alert.present();
        }
      });
    } else {
      const alert = await this.alertController.create({
        header: 'Invalid Form',
        message: this.getErrorMessage(),
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }
  getErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'Email is required.';
    } else if (this.email?.hasError('email')) {
      return 'Invalid email address.';
    } else if (this.password?.hasError('required')) {
      return 'Password is required.';
    } else if (this.password?.hasError('minlength')) {
      return 'Password must be at least 8 characters long.';
    } else if (this.password?.hasError('invalidPassword')) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
    } else {
      return 'Please fill in all fields correctly.';
    }
  }
  passwordValidator() {
    return (control: any) => {
      const password = control.value;
      if (!password) {
        return null;
      }
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      return passwordRegex.test(password) ? null : { invalidPassword: true };
    };
  }
}
