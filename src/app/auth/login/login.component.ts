import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthService } from '../../Services/user-services';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';



@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    public loginForm!: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: UserAuthService, 
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
                this.router.navigate(['']);
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