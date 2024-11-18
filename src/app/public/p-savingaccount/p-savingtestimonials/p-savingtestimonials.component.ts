import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-p-savingtestimonials',
  standalone: true,
  imports: [NgFor],
  templateUrl: './p-savingtestimonials.component.html',
  styleUrl: './p-savingtestimonials.component.css'
})
export class PSavingtestimonialsComponent {
  testimonials = [
    { image: 'assets/saving testimonials 1.png', heading: 'PSL Saving Account', text: 'Bits Bank PSL Saving Account can help you earn returns on your savings by semi-annual...', learnMoreLink: '#' },
    { image: 'assets/saving testimonials 2.png', heading: 'Daily Munafa Account', text: 'The perfect account for individuals and institutions with high transactional...', learnMoreLink: '#' },
    { image: 'assets/saving testimonials.png', heading: 'Mahana Amdan', text: 'Earn Monthly Profit Return', learnMoreLink: '#' },
    { image: 'assets/saving testimonials 4.png', heading: 'Bits Rutba', text: 'Bits Rutba, an account ideal for people aged 55 years and above.', learnMoreLink: '#' },
    { image: 'assets/foriegn currency.png', heading: 'Foreign Currency', text: 'An account for all those individuals who wish to maintain their savings in foreign...', learnMoreLink: '#' },
    { image: 'assets/saving testimonials 5.png', heading: 'Money Club', text: 'Bits Money Club, a savings account for children under 18 years.', learnMoreLink: '#' },
    { image: 'assets/value account.png', heading: 'Bits Value Account', text: 'The ideal savings account for small business owners and housewives.', learnMoreLink: '#' },
    { image: 'assets/progressvie.png', heading: 'Daily Progressive Account', text: 'A savings account for business entities that offers lucrative rates of return.', learnMoreLink: '#' },
  ];

  currentIndex = 0;

  showNextTestimonial() {
    if (this.currentIndex + 4 < this.testimonials.length) {
      this.currentIndex++;
    }
  }

  showPreviousTestimonial() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  getVisibleTestimonials() {
    return this.testimonials.slice(this.currentIndex, this.currentIndex + 4);
  }

  getProgressPercentage() {
    return ((this.currentIndex + 4) / this.testimonials.length) * 100;
  }
}
