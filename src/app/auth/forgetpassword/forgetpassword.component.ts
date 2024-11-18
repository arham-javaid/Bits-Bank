import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthService } from '../../Services/user-services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  email!: string;

  constructor(private formBuilder: FormBuilder,private authService: UserAuthService,
     private router: Router, private route:ActivatedRoute) {}

     ngOnInit(): void {
      this.forgotPasswordForm = this.formBuilder.group({
        email: new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
      });
    
      this.route.queryParams.subscribe((queryParams) => {
        this.email = queryParams['email'];
        if (this.email) {
          this.forgotPasswordForm.patchValue({ email: this.email });
          console.log(this.email , "email");
          
        }
      });
    }
    protected async onSubmit(): Promise<void> {
      if (!this.forgotPasswordForm.valid) {
        this.forgotPasswordForm.markAllAsTouched();
        return;
      }
    
      const email = this.forgotPasswordForm.value.email;
      console.log(email, "email");
    
      try {
        const response = await this.authService.forgotPassword({ email });
        console.log(response);    
        this.router.navigate(['/otp'], { queryParams: { email } });
    
      } catch (error) {
        console.error('Error sending password reset request:', error);
      }
    
      // Reset the form after successful submission
      this.forgotPasswordForm.reset();
    }
    

  emailError() {
      return this.forgotPasswordForm.get('email')?.hasError('required') ? 'Email is required' :
          this.forgotPasswordForm.get('email')?.hasError('email') ? 'Enter a valid email address' : '';
  }

  getEmail() {
      return this.forgotPasswordForm.get('email');
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



