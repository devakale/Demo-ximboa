import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/common_service/dashboard.service';
import { TrainerService } from 'src/app/common_service/trainer.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  starsArray = Array(5).fill(0);
  id: any;
  p: number = 1;
  showReview:any;

  constructor(private service:TrainerService){}

  ngOnInit(): void {
    this.service.gettrainerdatabyID().subscribe(data => {
      console.log(data);
      
      this.showReview = data?.reviews;
    });
  }

}
