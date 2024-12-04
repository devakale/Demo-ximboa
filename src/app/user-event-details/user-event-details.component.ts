import { Component, ElementRef, ViewChild } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { LoginService } from '../common_service/login.service';
import { AuthServiceService } from '../common_service/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-event-details',
  templateUrl: './user-event-details.component.html',
  styleUrls: ['./user-event-details.component.css']
})
export class UserEventDetailsComponent {

  id: any;
  ShowEvent:any;
  relatedEvent:any;
  p: number = 1;
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 3; 
  ShowEventReview:any;
  starsArray = Array(5).fill(0);
  routeSub: Subscription = new Subscription();



  constructor(private dservice:DashboardService,
    private router:ActivatedRoute,private route:Router,
  private loginservices:LoginService,private authService:AuthServiceService)
  {this.id=this.router.snapshot.paramMap.get('id');}

  // ngOnInit(): void {
  //   this.routeSub = this.router.params.subscribe(params => {
  //     this.id = params['id']; 
  //     this.loadevent(this.id);
  //   });   
  //     this.loadreview(this.currentPage,this.itemsPerPage);
  //     this.review.eventid=this.id;
  // }
  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    if (this.id) {
      this.loadevent(this.id); // Load course details
      this.loadreview(this.currentPage, this.itemsPerPage); // Load reviews
      this.review.eventid = this.id;
    }
  
    this.routeSub = this.router.params.subscribe((params) => {
      const newId = params['id'];
      if (newId !== this.id) {
        this.id = newId;
        
        this.currentPage = 1;
        this.ShowEventReview = [];
        this.totalItems = 0;
  
        this.loadevent(this.id);
        this.loadreview(this.currentPage, this.itemsPerPage);
      }
    });
  }



  loadevent(id:string): void{
    console.log("Event ID:", this.id);
        this.dservice.EventdatabyID(this.id).subscribe((data)=>{
        console.log("API Response:", data);
        this.ShowEvent = data?.event;
        this.relatedEvent = data.relatedEvent;
      })

  }

  loadreview(page: number, limit: number): void{
    this.dservice.GetEventReview(this.id,page, limit).subscribe((Response) =>{
      console.log("Review",Response);
    this.ShowEventReview = Response.data.reviews;
    this.totalItems = Response.pagination.totalReviews;
    })
  }
  
  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  BookEvent(event_id:string) {
    const token = sessionStorage.getItem('Authorization'); // Assuming your token is stored in sessionStorage

    if (token) {  
      
      const data = { event_id };
        this.dservice.bookevent(data).subscribe(
            response => {
           Swal.fire('Congratulation','You have Succssfully Booked Event! ', 'success');
            },
            error => {
                 Swal.fire('Error', 'You Have Already Enrolled This Event.', 'error');

            } );
        
        }
         else {
          sessionStorage.setItem('event_id',event_id)
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
  eventid:'',
}
postreviewEvent(){
  if (!this.review.review || !this.review.star_count) {
    Swal.fire('Sorry', 'Please provide both a review and a star rating to submit your feedback.', 'warning');
    return;
  }
  if(this.token){
    this.review.star_count = this.rating;
  this.dservice.postreviewEvent(this.review).subscribe({
    next : (Response) =>{
      Swal.fire('Ohh...!', 'You are Review Add Successfully..!', 'success');
      this.loadreview(this.currentPage,this.itemsPerPage);
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
    eventid: this.review.eventid 
  };
  this.rating = 0;  
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
          let event_id = sessionStorage.getItem('event_id')
           const data = { event_id };
           this.dservice.bookevent(data).subscribe(
               response => {
              Swal.fire('Congratulation','You have Succssfully Booked Event! ', 'success');
              sessionStorage.removeItem('event_id');
               },
               error => {
                    Swal.fire('Error', 'You Have Already Enrolled This Event.', 'error');
   
               } );
           
           
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

    showeventName = false;
    truneventName(name: string): string {
     return name.length > 14 ? name.slice(0, 12) + '...' : name;
   }


}
