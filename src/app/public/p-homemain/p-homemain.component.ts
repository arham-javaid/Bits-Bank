import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-p-homemain',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './p-homemain.component.html',
  styleUrl: './p-homemain.component.css'
})
export class PHomemainComponent {

  constructor(private router: Router) {}

  redirectToSignUp() {
    this.router.navigate(['/register']); 
  }


}
