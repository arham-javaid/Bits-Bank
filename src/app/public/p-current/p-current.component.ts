import { Component } from '@angular/core';
import { PCurrentoverviewComponent } from '../p-currentoverview/p-currentoverview.component';
import { PCurrentfeaturesComponent } from '../p-currentfeatures/p-currentfeatures.component';
import { PCurrentbenefitsComponent } from "../p-currentbenefits/p-currentbenefits.component";

@Component({
  selector: 'app-p-current',
  standalone: true,
  imports: [PCurrentoverviewComponent, PCurrentfeaturesComponent, PCurrentbenefitsComponent],
  templateUrl: './p-current.component.html',
  styleUrl: './p-current.component.css'
})
export class PCurrentComponent {

}
