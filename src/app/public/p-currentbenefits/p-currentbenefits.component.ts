import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-p-currentbenefits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './p-currentbenefits.component.html',
  styleUrl: './p-currentbenefits.component.css'
})
export class PCurrentbenefitsComponent {
  benefits = [
    {
      icon: '../../../assets/unlimitedtransaction.png',
      title: 'Unlimited Transactions',
      description: 'Enjoy unlimited transactions with no daily limits, perfect for business owners.'
    },
    {
      icon: '../../../assets/overdrafting.jpg',
      title: 'Overdraft Facility',
      description: 'Get access to an overdraft facility to manage cash flow efficiently.'
    },
    {
      icon: '../../../assets/freefundtransfer.jpg',
      title: 'Free Fund Transfers',
      description: 'Transfer funds easily without any additional charges or fees.'
    }
  ];
}
