import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/common_service/dashboard.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {


  id: string | null = null;  // ID can be string or null
  Showblogdetails: any;      // You can define a proper interface for type safety

  constructor(private blogdataid: DashboardService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    // Fetch the blog ID from the route parameters
    this.id = this.router.snapshot.paramMap.get('id');

    // Call the service method only if the ID exists
    if (this.id) {
      this.blogdataid.blogdatabyID(this.id).subscribe(
        (data) => {
          console.log('API Response:', data);
          // Adjust the property based on your API response structure
          this.Showblogdetails = data.course || data;  // Fallback if no "course" field is present
        },
        (error) => {
          console.error('Error fetching blog details:', error);
        }
      );
    }
  }
}
