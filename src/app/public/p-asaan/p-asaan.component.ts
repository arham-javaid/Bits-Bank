import { Component } from '@angular/core';
import { PAsaaninfoComponent } from "../p-asaaninfo/p-asaaninfo.component";
import { PAsaanbenefitsComponent } from "../p-asaanbenefits/p-asaanbenefits.component";
import { PAsaanfeaturesComponent } from "../p-asaanfeatures/p-asaanfeatures.component";

@Component({
  selector: 'app-p-asaan',
  standalone: true,
  imports: [PAsaaninfoComponent, PAsaanbenefitsComponent, PAsaanfeaturesComponent],
  templateUrl: './p-asaan.component.html',
  styleUrl: './p-asaan.component.css'
})
export class PAsaanComponent {

}
