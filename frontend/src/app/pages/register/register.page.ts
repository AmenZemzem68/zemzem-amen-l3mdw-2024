import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registrationForm!: FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off-outline';
  confirmPasswordType: string = 'password';
  confirmPasswordIcon: string = 'eye-off-outline';
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private menu : MenuController
  ) {}

  ngOnInit() {
    this.menu.swipeGesture(false);
    this.registrationForm = this.formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern("^[0-9]{8}$")]],
      adresse: ['', Validators.required],
      motDePasse: ['', [Validators.required, this.passwordValidator]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    // Pre-fill form if data is available
    const profileInfo = this.authService.getProfileInfo();
    if (profileInfo) {
      this.registrationForm.patchValue({
        prenom: profileInfo.first_name,
        nom: profileInfo.last_name,
        email: profileInfo.email,
        adresse: profileInfo.location
      });
    }
  }

  passwordValidator(control: AbstractControl) {
    const password = control.value;
    if (!password) {
      return null;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password) ? null : { invalidPassword: true };
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('motDePasse');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;
      return password === confirmPassword ? null : { mismatch: true };
    } else {
      return { mismatch: true };
    }
  }

  async onSignUp() {
    if (this.registrationForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Please wait...',
        spinner: 'crescent',
        translucent: true
      });
      await loading.present();

      const formData = new FormData();
      Object.keys(this.registrationForm.value).forEach(key => {
        formData.append(key, this.registrationForm.value[key]);
      });
      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      this.authService.register(formData).subscribe(
        async (response) => {
          console.log('Registration successful:', response);
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Registration Successful!',
            message: 'You have successfully registered.',
            buttons: ['OK']
          });
          await alert.present();
          await alert.onDidDismiss();
          this.router.navigateByUrl('/login');
        },
        async (error) => {
          console.error('Registration error:', error);
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Registration Error',
            message: error.error.message,
            buttons: ['OK']
          });
          await alert.present();
        }
      );
    } else {
      const alert = await this.alertController.create({
        header: 'Invalid Form',
        message: this.getErrorMessage(),
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  getErrorMessage() {
    if (this.registrationForm.get('email')?.hasError('email')) {
      return 'Invalid email address.';
    } else if (this.registrationForm.get('motDePasse')?.hasError('minlength')) {
      return 'Password must be at least 8 characters long.';
    } else if (this.registrationForm.hasError('mismatch')) {
      return 'Passwords do not match.';
    } else if (this.registrationForm.get('telephone')?.hasError('pattern')) {
      return 'Phone number must be 8 digits long.';
    } else if (this.registrationForm.get('motDePasse')?.hasError('invalidPassword')) {
      return 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.';
    } else {
      return 'Please fill in all required fields.';
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
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
}
