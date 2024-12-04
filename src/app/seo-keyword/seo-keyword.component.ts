import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';

@Component({
  selector: 'app-seo-keyword',
  templateUrl: './seo-keyword.component.html',
  styleUrls: ['./seo-keyword.component.css']
})
export class SEOKeywordComponent implements OnInit{

  Showdata:any[]=[];
  categories: any[] = [];
  courses: any[] = [];
  trainers: any[] = [];
  products: any[] = [];
  events: any[] = [];

  constructor(private service:DashboardService){}

  ngOnInit(): void {

    this.service.SEOkeywords().subscribe((data) =>{
        // console.log(data);
        this.categories = data.Category || [];
        this.courses = data.courses || [];        
        this.trainers = data.trainers || [];
        this.products = data.products || [];
        this.events = data.events || [];
        
    })
      
  }



}
