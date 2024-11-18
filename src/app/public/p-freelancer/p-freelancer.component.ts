import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PHomeComponent } from "../p-home/p-home.component";
import { PBenefitsComponent } from "../p-benefits/p-benefits.component";
import { PFreelancermainComponent } from "../p-freelancermain/p-freelancermain.component";


@Component({
  selector: 'app-p-freelancer',
  standalone: true,
  imports: [RouterLink, PHomeComponent, PBenefitsComponent, PFreelancermainComponent, ],
  templateUrl: './p-freelancer.component.html',
  styleUrl: './p-freelancer.component.css'
})
export class PFreelancerComponent {

}
