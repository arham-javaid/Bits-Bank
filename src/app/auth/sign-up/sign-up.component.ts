import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { UserAuthService } from '../../Services/user-services';
import { RolesService } from '../../Services/role-service';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ ReactiveFormsModule , CommonModule,],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  isSubmitting = false;
  signupForm!: FormGroup;
  Roles: any[] = [];
  constructor(private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute , private authService: AuthService,
    private userService:UserAuthService , private roleService: RolesService
  ) {
    this.signupForm = this.fb.group({
      email: new FormControl('', [Validators.required,]),
      password: new FormControl('', [Validators.required,]),
      CPassword: new FormControl('', [Validators.required,]),
      name: new FormControl('', [Validators.required,]),
      role: new FormControl('', [Validators.required,]),
    });
  }

  ngOnInit(): void {
    this.fetchRoles()
  }

  onSubmit() {
    if (!this.signupForm.valid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    const user = {
      ...this.signupForm.value, 
    };

    this.userService.signUp(user).subscribe(
      (response) => {
        this.router.navigate(['/signin']);
        console.log('signUp successful:', response);
      },
      (error) => {
        console.error('Signup error:', error);
      })
  }

  async fetchRoles() {
    try {
      const response: any = await this.roleService.getRoles(); 
      this.Roles = response; 
      
      console.log(this.Roles , "roles");
      
    } catch (error: any) {
      console.error('Error fetching roles:', error);
    }
  }

  emailError() {
    return this.signupForm.controls['email'].hasError('required') ? 'Email is required' : '';
  }
  passwordError() {
    return this.signupForm.controls['password'].hasError('required') ? 'Password is required' : '';
  }
  nameError() {
    return this.signupForm.controls['name'].hasError('required') ? 'Name is required' : '';

  }
  CPasswordError() {
    return this.signupForm.controls['CPassword'].hasError('required') ? 'Confirm Password is required' : '';
  }
  roleError() {
    return this.signupForm.controls['role'].hasError('required') ? 'Role is required' : '';
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get CPassword() {
    return this.signupForm.get('CPassword');
  }
  get name() {
    return this.signupForm.get('name');
  }

  get role() {
    return this.signupForm.get('role');
  }
}
