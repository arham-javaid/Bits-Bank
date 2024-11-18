import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-p-saving',
  standalone: true,
  imports: [NgIf],
  templateUrl: './p-saving.component.html',
  styleUrl: './p-saving.component.css'
})
export class PSavingComponent {
  activeContent: string = '';
  showContent(content: string) {
    console.log('Icon clicked:', content);
    this.activeContent = content;
    console.log('Active content set to:', this.activeContent);
  }
}
