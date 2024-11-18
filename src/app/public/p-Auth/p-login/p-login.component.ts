import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule , FormControl } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserAuthService } from '../../../Services/user-services';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-p-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,RouterLink],
  templateUrl: './p-login.component.html',
  styleUrls: ['./p-login.component.css']
})
export class PLoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private toastr:ToastrService ,
     private authService: UserAuthService, 
      private router: Router) { }

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
          email: new FormControl('', [
              Validators.required,
              Validators.email,
          ]),
          password: new FormControl('', [
              Validators.required,
              Validators.minLength(6),
          ]),
      });
  }
  onSubmit() {
      if (!this.loginForm.valid) {
          this.loginForm.markAllAsTouched();
          return;
      }

      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      const data = { email, password };

      this.authService.logIn(data).then(
          response => {
              console.log(response, "dataaaaaaaaa");
              this.toastr.success('User Login Successfull.', 'Success',{
                positionClass: 'toast-top-right',
             });
              this.router.navigate(['/transactions']);
          },
          // () => alert("An unexpected error occurred. Please try again.")
      );
  }



  emailError() {
      return this.loginForm.get('email')?.hasError('required') ? 'Email is required' :
          this.loginForm.get('email')?.hasError('email') ? 'Enter a valid email address' : '';
  }

  getEmail() {
      return this.loginForm.get('email');
  }

  passwordError() {
      return this.loginForm.get('password')?.hasError('required') ? 'Password is required' :
          this.loginForm.get('password')?.hasError('minlength') ? 'Password must be at least 6 characters' : '';
  }

  getPassword() {
      return this.loginForm.get('password');
  }

  private markFormGroupTouched(formGroup: FormGroup) {
      Object.values(formGroup.controls).forEach(control => {
          control.markAsTouched();

          if (control instanceof FormGroup) {
              this.markFormGroupTouched(control);
          }
      });
  }
}
