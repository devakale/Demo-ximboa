
import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

@Component({
  selector: 'app-arrowanimation',
  templateUrl: './arrowanimation.component.html',
  styleUrls: ['./arrowanimation.component.css']
})
export class ArrowanimationComponent implements AfterViewInit  {
  ngAfterViewInit(): void {
    gsap.registerPlugin(MotionPathPlugin);

    // Set the arrow group transform origin to its center
    gsap.set("#arrow-group", { transformOrigin: "50% 50%" });

    // Create the animation timeline
    const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // Animate line drawing
    timeline.to("#line", {
      duration: 4,
      strokeDashoffset: 0,
      ease: "none"
    });

    // Animate arrow movement along the line
    timeline.to("#arrow-group", {
      duration: 4,
      motionPath: {
        path: "#line",
        align: "#line",
        autoRotate: true, // Enable auto rotation
        alignOrigin: [0.5, 0.5] // Center the rotation
      },
      ease: "none"
    }, 0);
  }
}
