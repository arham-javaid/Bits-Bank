import { Component } from '@angular/core';
import { PHomemainComponent } from "../p-homemain/p-homemain.component";
import { PProductComponent } from "../p-product/p-product.component";

@Component({
  selector: 'app-p-home',
  standalone: true,
  imports: [PHomemainComponent, PProductComponent],
  templateUrl: './p-home.component.html',
  styleUrl: './p-home.component.css'
})
export class PHomeComponent {

}
