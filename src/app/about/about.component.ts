import { Component,OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [                          // Animations array starts here
    trigger('slideInLeft', [              // Define the trigger for animation
      transition(':enter', [              // Animation applies when element enters the DOM
        style({ transform: 'translateX(-100%)' }),  // Start with X translation
        animate('2s ease-out', style({ transform: 'translateX(0)' })) // Animate back to 0
      ])
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),  // Start from the right (100%)
        animate('5s ease-out', style({ transform: 'translateX(0)' }))  // Animate back to the original position (0%)
      ])
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('5s ease-out', style({ transform: 'translateY(0)' }))
      ])
    ])
  ]             
})
export class AboutComponent implements OnInit {
  counterValue: number = 0;  // initial value

  ngOnInit(): void {
    this.startCounter();
  }

  startCounter() {
    const targetValue = 180;
    const duration = 3000; // Counter duration in milliseconds
    const increment = targetValue / (duration / 100);  // Update every 100ms

    const interval = setInterval(() => {
      this.counterValue += increment;
      if (this.counterValue >= targetValue) {
        this.counterValue = targetValue;  // Ensure it doesn't exceed the target
        clearInterval(interval);          // Stop when the target is reached
      }
    }, 100);
  }

  
}
