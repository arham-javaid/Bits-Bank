import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { UserAuthService } from '../../../Services/user-services';
import { RolesService } from '../../../Services/role-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-p-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './p-register.component.html',
  styleUrls: ['./p-register.component.css'] 
})
export class PRegisterComponent implements OnInit {  
  signUpForm!: FormGroup;
  email!: string;
  
  constructor(private fb: FormBuilder ,
    private router: Router, private route: ActivatedRoute , private authService: AuthService,
    private userService:UserAuthService , private roleService: RolesService , private toastr:ToastrService
  ) {}

  ngOnInit() {
    // Subscribe to query parameters to get the email
    this.route.queryParams.subscribe((queryParams) => {
      this.email = queryParams['email'];
      console.log(this.email , "email");
      
  
      // Initialize the form with the email value from query params
      this.signUpForm = this.fb.group({
        name: ['', Validators.required],
        // role: ['', Validators.required],
        fatherName: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]], // 11 digits
        email: ['', [Validators.required, Validators.email]], // Set email from query params or leave it empty
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required]
      }, { validators: this.passwordMatchValidator });
    });
  }
  
  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')!.value;
    const confirmPassword = form.get('confirmPassword')!.value;
    return password === confirmPassword ? null : { 'mismatch': true };
  }

  

  onSubmit() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    const user = {
      ...this.signUpForm.value, 
       role: "client"
    };

    const email = user.email;
    console.log(email);

    this.userService.signUp(user).subscribe(
      (response) => {
        console.log(response);    
        this.router.navigate(['/accountotp'], { queryParams: { email } });
        this.toastr.info('Please Check Email for Otp.', 'Success',{
          positionClass: 'toast-top-right',
       });
        console.log('signUp successful:', response);
      },
      (error) => {
        console.error('Signup error:', error);
      })
  }

  tologinpage(){
    this.router.navigate(['p-login']);
  }
}
