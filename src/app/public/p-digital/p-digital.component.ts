import { Component } from '@angular/core';
import { PDigitalmainComponent } from "../p-digitalmain/p-digitalmain.component";
import { PDigitalneedComponent } from "../p-digitalneed/p-digitalneed.component";
import { PDigitalfoursComponent } from '../p-digitalfours/p-digitalfours.component';

@Component({
  selector: 'app-p-digital',
  standalone: true,
  imports: [PDigitalmainComponent, PDigitalneedComponent,PDigitalfoursComponent],
  templateUrl: './p-digital.component.html',
  styleUrl: './p-digital.component.css'
})
export class PDigitalComponent {

}
