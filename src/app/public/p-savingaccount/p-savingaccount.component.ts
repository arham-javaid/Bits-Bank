import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PSavingaccountmainComponent } from "../p-savingaccountmain/p-savingaccountmain.component";
import { PSavingComponent } from "./p-saving/p-saving.component";
import { PSavingtestimonialsComponent } from "./p-savingtestimonials/p-savingtestimonials.component";

@Component({
  selector: 'app-p-savingaccount',
  standalone: true,
  imports: [RouterLink, PSavingaccountmainComponent, PSavingComponent, PSavingtestimonialsComponent],
  templateUrl: './p-savingaccount.component.html',
  styleUrl: './p-savingaccount.component.css'
})
export class PSavingaccountComponent {

}
