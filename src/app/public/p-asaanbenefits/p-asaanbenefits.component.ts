import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-p-asaanbenefits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './p-asaanbenefits.component.html',
  styleUrl: './p-asaanbenefits.component.css'
})
export class PAsaanbenefitsComponent {
  benefits = [
    {
      icon: 'fa-solid fa-money-bill-wave',
      title: 'No Initial Deposit',
      description: 'Start your account with no initial deposit requirements.'
    },
    {
      icon: 'fa-solid fa-credit-card',
      title: 'Digital Account Opening',
      description: 'Open your account online without visiting a branch.'
    },
    {
      icon: 'fa-solid fa-wallet',
      title: 'No Minimum Balance Requirement',
      description: 'Enjoy the freedom of maintaining any balance in your account with no minimum balance requirement.'
    },
    {
      icon: 'fa-solid fa-mobile-alt',
      title: '24/7 Banking Access',
      description: 'Manage your account anytime using our mobile app and net banking.'
    }
  ];
}
