import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../common_service/login.service';
import Swal from 'sweetalert2';
import { AuthServiceService } from '../common_service/auth-service.service';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-courseenroll',
  templateUrl: './courseenroll.component.html',
  styleUrls: ['./courseenroll.component.css']
})
export class CourseenrollComponent implements OnInit, OnDestroy {

  

    id: any;
    Showcoursedetails:any;
    ShowCourseReview:any;
    RelatedCourses:any;
    p: number = 1;
    totalItems = 0;
    currentPage = 1;
    itemsPerPage = 3; 
    starsArray = Array(5).fill(0);
    routeSub: Subscription = new Subscription();


    constructor(private dservice:DashboardService,private router:ActivatedRoute, private route:Router,
      private loginservices:LoginService,private authService:AuthServiceService)
    {this.id=this.router.snapshot.paramMap.get('id');}
    
    ngOnInit(): void {
      this.id = this.router.snapshot.paramMap.get('id');
      if (this.id) {
        this.loadCourseDetails(this.id); // Load course details
        this.loadreview(this.currentPage, this.itemsPerPage); // Load reviews
        this.review.courseid = this.id;
      }
    
      this.routeSub = this.router.params.subscribe((params) => {
        const newId = params['id'];
        if (newId !== this.id) {
          this.id = newId;
          
          this.currentPage = 1;
          this.ShowCourseReview = [];
          this.totalItems = 0;
    
          this.loadCourseDetails(this.id);
          this.loadreview(this.currentPage, this.itemsPerPage);
        }
      });
    }
    

    showcourseName = false;
    truncatecourseName(name: string): string {
     return name.length > 18 ? name.slice(0, 12) + '...' : name;
   }
   showbusinessName = false;
  trunbusinessName(name: string): string {
   return name.length > 18 ? name.slice(0, 13) + '...' : name;
 }
    

    loadCourseDetails(id: string): void {
      // console.log("Course ID:", this.id);
      this.dservice.getcouserdatabyID(this.id).subscribe((data)=>{
        console.log("API Response:", data);
        this.Showcoursedetails = data?.course;
        this.RelatedCourses = data.relatedCourses;
      });
    }
    
      loadreview(page: number, limit: number): void{
        this.dservice.GetCourseReview(this.id,page, limit).subscribe((Response) =>{
          console.log("Review",Response);
        this.ShowCourseReview = Response.data.reviews;
        this.totalItems = Response.pagination.totalReviews;
        })
      }

      ngOnDestroy(): void {
        if (this.routeSub) {
          this.routeSub.unsubscribe();
        }
      }

      
      
      CourseEnroll(course_id: string) {
      const token = sessionStorage.getItem('Authorization'); // Assuming your token is stored in sessionStorage
      if (token) {
          const data = { course_id };
          this.dservice.courseenroll(data).subscribe(
              response => {
                Swal.fire('Congratulation','You have Succssfully Enroll Now! ', 'success');
              },
              error => {
                  // console.error("Error during enrollment", error);
                   Swal.fire('Error', 'You Have Already Enrolled This course.', 'error');
              }
          );}
           else {
            console.log(course_id);
            sessionStorage.setItem('course_id',course_id);

             const modalElement = document.getElementById('CheckLoggedIN');
              if (modalElement) {
                const modal = new (window as any).bootstrap.Modal(modalElement);
                modal.show();
              }
      }
  }

  token = sessionStorage.getItem('Authorization');

  stars: number[] = [1, 2, 3, 4, 5];  
  rating: number = 0;  


  toggleRating(clickedStar: number): void {
    if (this.rating === clickedStar) {
      this.rating = 0; // Reset the rating if the same star is clicked
    } else {
      this.rating = clickedStar; // Set the new rating
    }
    this.review.star_count = this.rating; // Ensure star count is updated
  }

  review = {
    review: '',
    star_count: 0,
    courseid:'',
  }

  postreviewCourse(){
    if (!this.review.review || !this.review.star_count) {
      Swal.fire('Sorry', 'Please provide both a review and a star rating to submit your feedback.', 'warning');
      return;
    }
    if(this.token){
      this.review.star_count = this.rating;
    this.dservice.postreviewCourse(this.review).subscribe({
      next : (Response) =>{
        Swal.fire('Ohh...!', 'You are Review Add Successfully..!', 'success');
        this.loadreview(this.currentPage, this.itemsPerPage);
        this.resetForm();
      },
      error : (Error) => {
        Swal.fire('Error', 'sorry..!', 'error');
      }
    })
  }
  else{
    const modalElement = document.getElementById('CheckLoggedIN');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }  }
  }

  resetForm() {
    this.review = {
      star_count: 0,
      review: '',
      courseid: this.review.courseid 
    };
    this.rating = 0;  
  }


  // conver Rupees K or laks
  getFormattedPrice(price: number): string {
    if (price >= 100000) {
      return '₹' +  (price / 100000).toFixed(1) + 'L';  // For lakhs
    } else if (price >= 1000) {
      return '₹' + (price / 1000).toFixed(1) + 'K';  // For thousands
    } else {
      return '₹' + price.toString();  // For rupees
    }
  }

    // Handle page change for pagination
    onPageChange(page: number): void {
      this.currentPage = page;
      this.loadreview(this.currentPage, this.itemsPerPage); 
      this.p = page;
    }


  currentUrl: string = window.location.href;

  shareOnWhatsApp() {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(this.currentUrl)}`;
      window.open(whatsappUrl, '_blank');
  }
  
  
  copyLink() {
      navigator.clipboard.writeText(this.currentUrl).then(() => {
          alert('Link copied to clipboard!');
      }).catch(err => {
          console.error('Could not copy text: ', err);
      });
  }
  
  shareOnFacebook() {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.currentUrl)}`;
      window.open(facebookUrl, '_blank');
  }

  showshare=false;
  shareicon(){
    this.showshare = !this.showshare;
  }
  
  show: boolean = false; 
  rememberMe: boolean = false;

   userData= {
      f_Name:'',
      middle_Name:'',
      l_Name:'',
      email_id:' ',
      password:'',
      mobile_number:' ',

  }


      onSubmit(form: NgForm) {
        if (form.valid) {
          this.loginservices.postsignupdata(this.userData).subscribe({
            next: (response) => {
              sessionStorage.setItem("Authorization",response.token);
               this.authService.login(response.token); // Set login state
              Swal.fire('Congratulation','Welcome to Ximbo! <br> Were thrilled to have you join our community of esteemed trainers, coaches, and educators. Ximbo is designed to empower you with the tools and resources needed to deliver exceptional training and create impactful learning experiences. <br> You Have Register successfully!', 'success');
              let course_id = sessionStorage.getItem('course_id');
              const data = { course_id };
              console.log(data);
              
              this.dservice.courseenroll(data).subscribe({
                next: (response) => {
               Swal.fire('Congratulation','You have Succssfully Enroll Now! ', 'success');
                sessionStorage.removeItem('course_id');
              },
              error: (error) => {
                   Swal.fire('Error', 'You Have Already Enrolled This course.', 'error');
              }
             });
            },
            error: (error)=>{
              Swal.fire('Error', 'Please Enter Valid Details.', 'error');
            } 
          });
        } else {
          console.log('Form is invalid');
        }
      }


       // Hide And Show Password Logic
       togglePassword() {
        this.show = !this.show;
      }

}

  

