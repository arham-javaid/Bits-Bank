import { Component } from '@angular/core';
import { PBusinessintroComponent } from '../p-businessintro/p-businessintro.component';
import { PBusinessfeaturesComponent } from "../p-businessfeatures/p-businessfeatures.component";
import { PBusinessstepsComponent } from "../p-businesssteps/p-businesssteps.component";
import { PBusinesstestimonialsComponent } from "../p-businesstestimonials/p-businesstestimonials.component";

@Component({
  selector: 'app-p-business',
  standalone: true,
  imports: [PBusinessintroComponent, PBusinessfeaturesComponent, PBusinessstepsComponent, PBusinesstestimonialsComponent],
  templateUrl: './p-business.component.html',
  styleUrl: './p-business.component.css'
})
export class PBusinessComponent {

}
