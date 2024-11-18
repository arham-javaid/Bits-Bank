import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthService } from '../../../Services/user-services';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-account-otp',
  standalone: true,
   imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './account-otp.component.html',
  styleUrl: './account-otp.component.css'
})
export class AccountOtpComponent {

  public otpForm!: FormGroup;
  data: any;
  email!: string;
  isLogin: boolean = false;
  
  constructor(private formBuilder: FormBuilder 
    ,private authService: UserAuthService,
    private toastr: ToastrService,
     private router: Router, private route :ActivatedRoute
  ) { 
    this.otpForm = this.formBuilder.group({
      digit1: new FormControl('', [Validators.required]),
      digit2: new FormControl('', [Validators.required]),
      digit3: new FormControl('', [Validators.required]),
      digit4: new FormControl('', [Validators.required]),
      digit5: new FormControl('', [Validators.required]),
      digit6: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.email = queryParams['email'];
      console.log(this.email , "email");
      this.isLogin = queryParams['isForLogin']
    });
  }

onSubmit() {
  // Mark all form fields as touched to trigger validation messages
  this.markFormGroupTouched(this.otpForm);

  if (this.otpForm.valid) {
    // Combine the OTP values from the form fields into a single string
    const enteredOtp = Object.values(this.otpForm.value).join('');
    console.log('Entered OTP:', enteredOtp);

    if (!this.isLogin) {
      // Create an object that contains the verification (OTP) and email
      const verification = {
        verification: enteredOtp,
        email: this.email
      };
      console.log(verification , "email");
      

      // Verify the OTP with the backend
      this.authService.accouuntVerify(verification)
        .then(response => {
          this.toastr.success('User Saved Successfull.', 'Success',{
            positionClass: 'toast-top-right',
         });
          this.router.navigate(['/p-login'], { queryParams: { email: this.email } });
        })
        .catch(error => {
          // Handle any errors during OTP verification
          console.error('Error:', error);
        });
    }
  }
}

  

  getOtp() {
    return this.otpForm;
  }

  otpError() {
    return this.otpForm.invalid ? 'Please enter a valid OTP' : '';
  }

  moveToNext(nextInput: number) {
    const currentInput = nextInput - 1;

    if (this.otpForm.get(`digit${currentInput}`)?.value.length === 1) {
      const nextInputId = `otp${nextInput}`;
      document.getElementById(nextInputId)?.focus();
    }
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

