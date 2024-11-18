import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-clock',
  standalone: true,
  imports: [],
  templateUrl: './live-clock.component.html',
  styleUrl: './live-clock.component.css'
})
export class LiveClockComponent implements OnInit, OnDestroy {
  time: string = '';
  private intervalId: any;

  ngOnInit(): void {
    this.startClock();
  }

  startClock(): void {
    this.intervalId = setInterval(() => {
      const currentTime = new Date();
      
      // Get hours, minutes, seconds, and milliseconds
      let hours = currentTime.getHours();
      const minutes = this.padZero(currentTime.getMinutes());
      const seconds = this.padZero(currentTime.getSeconds());
      const milliseconds = this.padZero(currentTime.getMilliseconds(), 3);

      // Determine AM or PM
      const ampm = hours >= 12 ? 'PM' : 'AM';

      // Convert 24-hour format to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // If hours is 0, make it 12

      // Add zero padding to hours
      const paddedHours = this.padZero(hours);

      // Set the formatted time
      this.time = `${paddedHours}:${minutes}:${seconds} ${ampm}`;
    }, 1);
  }

  padZero(num: number, size: number = 2): string {
    let s = num.toString();
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
