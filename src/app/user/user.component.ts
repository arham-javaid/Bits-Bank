import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule, } from '@angular/forms';
import { UserAuthService } from '../Services/user-services';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  userId = "";

  title = 'angular17';
  public userForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private userAuthService: UserAuthService,
    private route: ActivatedRoute,
    private router: Router) {

    this.userForm = this.formBuilder.group({

      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),

      fatherName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),

      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),

      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(11),
      ]),

      verified: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];

      if (this.userId) {
        this.populateForm(this.userId);
      }
    });
  }
  async populateForm(userId: string): Promise<void> {
    try {
      if (userId) {
        this.userAuthService.getUserById(userId).subscribe(
          (userData: any) => {
            if (userData) {
              this.userForm.patchValue(userData);
            } else {
              console.error('User data not found.');
            }
          },
          (error) => {
            console.error('Error fetching user data:', error);
          }
        );
      } else {
        console.error('User ID is not available.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }
  async onSubmit() {

    this.markFormGroupTouched(this.userForm);
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      console.log(userData);   
      try {
        if (this.userId) {
          const response = await this.userAuthService.updateUser(this.userId, userData);
          console.log('User updated successfully:', response);

        } else {
          const response = await this.userAuthService.createUser(userData);
          console.log('User created successfully:', response);

        }
      } catch (error) {
        console.error('Error:', error);

      }
      finally {
        this.router.navigate(['/Accounts']);
        this.userForm.reset();
      }
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
  firstNameError() {

    return this.userForm.get('name')?.hasError('required') ? 'Name is Required' :
      this.userForm.get('name')?.hasError('minlength') ? 'Name cannot be less than 4 characters' : '';
  }

  fatherNameError() {

    return this.userForm.get('fatherName')?.hasError('required') ? 'Father Name is Required' :
      this.userForm.get('fatherName')?.hasError('minlength') ? 'Father Name cannot be less than 4 characters' : '';
  }
  getFirstName() {
    return this.userForm.get('name');
  }
  getfatherName() {
    return this.userForm.get('fatherName');
  }

  PhoneError() {
    return this.userForm.get('phone')?.hasError('required') ? 'Phone is Required' :
      this.userForm.get('phone')?.hasError('minlength') ? 'Phone Number cannot be less than 11 Numbers' : '';
  }
  getPhone() {
    return this.userForm.get('phone');
  }

  getEmail() {
    return this.userForm.get('email');
  }

  verifiedError() {
    return this.userForm.get('verified')?.hasError('required') ? 'Verified is Required' :
     '';
  }

  getVerified() {

    return this.userForm.get('verified');
  }
  emailError() {
    return this.userForm.get('email')?.hasError('required') ? 'Email is Required' :
      this.userForm.get('email')?.hasError('email') ? 'Email must be in email format' : '';
  }

  getemail() {
    console.log(this.userForm.get('address'));

    return this.userForm.get('address');
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
