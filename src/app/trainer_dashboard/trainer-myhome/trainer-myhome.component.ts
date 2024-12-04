import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from 'src/app/common_service/dashboard.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ChartComponent } from "ng-apexcharts";
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart, ApexAxisChartSeries, ApexXAxis, ApexDataLabels, ApexTooltip, ApexStroke } from "ng-apexcharts";
import { AuthServiceService } from 'src/app/common_service/auth-service.service';

export type DonutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type AreaChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-trainer-myhome',
  templateUrl: './trainer-myhome.component.html',
  styleUrls: ['./trainer-myhome.component.css']
})
export class TrainerMyhomeComponent implements OnInit {


  isTrainer: boolean = false;
  isUser: boolean = false;
  isAdmin: boolean = false;
  isInstitute: boolean = false;
  isSELF_EXPERT: boolean = false

  showDashboardata: any;

  @ViewChild("donutChart") donutChart!: ChartComponent;
  @ViewChild("areaChart") areaChart!: ChartComponent;

  public chartOptions: Partial<DonutChartOptions>;
  public areaChartOptions: Partial<AreaChartOptions>;

  constructor(
    private service: DashboardService,
    private router: Router,
    private http: HttpClient,
    private auth: AuthServiceService
  ) {
    // Initialize Donut Chart Options
    // Initialize chartOptions with default values
    this.chartOptions = {
      series: [0, 0, 0],  // Placeholder values
      chart: {
        type: "donut"
      },
      labels: ["Course", "Events", "Products", "Trainer"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    // Initialize Area Chart Options
    this.areaChartOptions = {
      series: [
        {
          name: "Series 1 ",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "Series 2",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      chart: {
        height: 300,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
  }

  ngOnInit(): void {

    this.checkUserRole();

    if (this.isAdmin) {
      this.AdminCount(); // Call AdminCount if the role is SUPER_ADMIN
    } else {
      this.loadCount(); // Call loadCount for other roles
    }
  }
  

  loadCount(){
    this.service.getDashboardData().subscribe(result => {
      console.log(result);
      this.showDashboardata = result.data;
      if (this.showDashboardata) {
        this.chartOptions.series = [
          this.showDashboardata.totalCourses || 0,
          this.showDashboardata.totalEvents || 0,
          this.showDashboardata.totalProducts || 0
        ];
      }
    });
  }

  AdminCount(){
    this.service.getDashboardDataAdmin().subscribe(response =>{
        this.showDashboardata = response.data;
        console.log("Admin count" ,response);
        
        if (this.showDashboardata ) {
          this.chartOptions.series = [
            this.showDashboardata.totalCourses || 0,
            this.showDashboardata.totalEvents || 0,
            this.showDashboardata.totalProducts || 0,
            this.showDashboardata.trainerCount || 0
          ];
        }
    })
  }

  

  checkUserRole() {
    const role = this.auth.getUserRole();
    console.log('User Role:', role);

    this.isAdmin = role === 'SUPER_ADMIN';
    this.isTrainer = role === 'TRAINER';
    this.isInstitute = role === 'INSTITUTE';
    this.isSELF_EXPERT = role == 'SELF_EXPERT';
    this.isUser = role === 'USER' || role === 'TRAINER' || role === 'SUPER_ADMIN' || role === 'INSTITUTE' || role === 'SELF_EXPERT';

    console.log("user fetch role", 'isTrainer:', this.isTrainer, 'isUser:', this.isUser, 'isAdmin:', this.isAdmin, this.isInstitute, this.isSELF_EXPERT);
  }



  // fetchUserProfile(token: string) {
  //   const apiUrl = 'http://localhost:1000/api/linkedin/userinfo';

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });

  //   this.http.get(apiUrl, { headers }).subscribe(
  //     (response: any) => {
  //       console.log(response);
  //     },
  //     (error) => {
  //       console.error('Error fetching profile', error);
  //     }
  //   );
  // }

}
