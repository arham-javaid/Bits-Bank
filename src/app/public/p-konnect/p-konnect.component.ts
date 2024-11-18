import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-p-konnect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './p-konnect.component.html',
  styleUrl: './p-konnect.component.css',
  animations: [
    trigger('slideInImage', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('1.1s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('slideInText', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('1.1s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
  ]
})
export class PKonnectComponent {
  activeTab: string = 'hbl';

  setActive(tab: string) {
    this.activeTab = tab;
  }
}
