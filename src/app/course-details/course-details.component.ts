import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TrainerService } from '../common_service/trainer.service';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../common_service/dashboard.service';
import Swal from 'sweetalert2';
import { Token } from '@angular/compiler';
import { LoginService } from '../common_service/login.service';
import { AuthServiceService } from '../common_service/auth-service.service';
declare var bootstrap: any;


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CourseDetailsComponent implements OnInit {

  showprofile:any;
  showreviewdata:any[] = [];
  starsArray = Array(5).fill(0);
  id: any;
  p: number = 1;
  totalItems = 0;
  currentPage = 1;
  currentPageBatches: number = 1;  
  currentPageUpcomingBatches: number = 1;
  currentPageOnlineEvents: number = 1;
  currentPageOfflineEvents: number = 1;
  currentPageProducts: number = 1;

  itemsPerPage: number = 2; 
  itemsPerPageAllcourses: number = 4; 



  AllCourses:any;
  AllEvents:any;
  AllProducts:any;

  makeCall() {
    const phoneNumber = this.showprofile.trainer.mobile_number;
    window.location.href = `tel:${phoneNumber}`;
  }

  constructor(private serive:TrainerService,private router:ActivatedRoute,private authService:AuthServiceService,
    private dashboard:DashboardService,private loginservices:LoginService,private route:Router)
  {this.id=this.router.snapshot.paramMap.get('id');}

  ngOnInit(): void {
    this.serive.getprofile(this.id).subscribe(data =>{
      console.log("data",data);
      this.showprofile = data;  
      this.showreviewdata = data?.reviews; // Bind reviews data to showreviewdata
    });
    
    this.GetAllCourses(this.currentPage,this.itemsPerPageAllcourses)
    this.GetAllEvents(this.currentPage,this.itemsPerPageAllcourses)
    this.GetAllProducts(this.currentPage,this.itemsPerPage)
    
    this.enquiry.trainerid = this.id;
    this.question.trainerid = this.id;
    this.review.t_id=this.id;
    this.Appoinment.t_id=this.id;
  }

  ngAfterViewInit(): void {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

      GetAllCourses(page: number, limit: number){
          this.serive.GetAllCoursesonprofilepage(this.id,page, limit).subscribe(Response => {
            this.AllCourses = Response.data;
            this.totalItems = Response.pagination.totalItems;
            console.log("All Couese by id",Response);
            
          })
      }

    GetAllEvents(page: number, limit: number){
        this.serive.GetAllEventsonprofilepage(this.id,page, limit).subscribe(Response => {
          this.AllEvents = Response.data;
          this.totalItems = Response.pagination.totalItems;
          console.log("All Couese by id",Response);
          
        })
    }

    GetAllProducts(page: number, limit: number){
      this.serive.GetAllProductonprofilepage(this.id,page, limit).subscribe(Response => {
        this.AllProducts = Response.data;
        this.totalItems = Response.pagination.totalItems;
        console.log("All Couese by id",Response);
        
      })
    }

// Pagination methods for All Courses
    totalPagescourses(): number {
      return Math.ceil(this.totalItems / this.itemsPerPageAllcourses);
    }
    
    AllCoursesnextPageBatches(): void {
      if (this.currentPage < this.totalPagescourses()) {
        this.currentPage++;
        this.GetAllCourses(this.currentPage, this.itemsPerPageAllcourses);
      }
    }
    
    AllCoursespreviousPageBatches(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.GetAllCourses(this.currentPage, this.itemsPerPageAllcourses);
      }
    }
// Pagination methods for All Events
      totalPagesEvents(): number {
        return Math.ceil(this.totalItems / this.itemsPerPageAllcourses);
      }

      AllEventsnextPageBatches(): void {
        if (this.currentPage < this.totalPagesEvents()) {
          this.currentPage++;
          this.GetAllEvents(this.currentPage, this.itemsPerPageAllcourses);
        }
      }

      AllEventspreviousPageBatches(): void {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.GetAllEvents(this.currentPage, this.itemsPerPageAllcourses);
        }
      }

// Pagination methods for All Products

      totalPagesProducts(): number {
        return Math.ceil(this.totalItems / this.itemsPerPage);
      }

      AllProductsnextPage(): void {
        if (this.currentPage < this.totalPagesProducts()) {
          this.currentPage++;
          this.GetAllProducts(this.currentPage, this.itemsPerPage);
        }
      }

      AllProductspreviousPage(): void {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.GetAllProducts(this.currentPage, this.itemsPerPage);
        }
      }

  
  // Pagination methods for Current Batches
      // totalPagesBatches(): number {
      //   return Math.ceil(this.showprofile.OnGoingBatches.length / this.itemsPerPage);
      // }

      // nextPageBatches(): void {
      //   if (this.currentPageBatches < this.totalPagesBatches()) {
      //     this.currentPageBatches++;
      //   }
      // }

      // previousPageBatches(): void {
      //   if (this.currentPageBatches > 1) {
      //     this.currentPageBatches--;
      //   }
      // }

  // Pagination methods for Upcoming Batches
      // totalPagesUpcomingBatches(): number {
      //   return Math.ceil(this.showprofile.UpcomingBatches.length / this.itemsPerPage);
      // }

      // nextPageUpcomingBatches(): void {
      //   if (this.currentPageUpcomingBatches < this.totalPagesUpcomingBatches()) {
      //     this.currentPageUpcomingBatches++;
      //   }
      // }

      // previousPageUpcomingBatches(): void {
      //   if (this.currentPageUpcomingBatches > 1) {
      //     this.currentPageUpcomingBatches--;
      //   }
      // }

  // Pagination methods for Online Events
      // totalPagesOnlineEvents(): number {
      //   return Math.ceil(this.showprofile.onlineEventsThumbnailUrl.length / this.itemsPerPage);
      // }

      // nextPageOnlineEvents(): void {
      //   if (this.currentPageOnlineEvents < this.totalPagesOnlineEvents()) {
      //     this.currentPageOnlineEvents++;
      //   }
      // }

      // previousPageOnlineEvents(): void {
      //   if (this.currentPageOnlineEvents > 1) {
      //     this.currentPageOnlineEvents--;
      //   }
      // }

  // Pagination methods for Offline Events
        // totalPagesOfflineEvents(): number {
        //   return Math.ceil(this.showprofile.offlienEventsThumbnailUrl.length / this.itemsPerPage);
        // }

        // nextPageOfflineEvents(): void {
        //   if (this.currentPageOfflineEvents < this.totalPagesOfflineEvents()) {
        //     this.currentPageOfflineEvents++;
        //   }
        // }

        // previousPageOfflineEvents(): void {
        //   if (this.currentPageOfflineEvents > 1) {
        //     this.currentPageOfflineEvents--;
        //   }
        // }

  
  // Get items for Current Batches
      // get currentBatches(): any[] {
      //   const startIndex = (this.currentPageBatches - 1) * this.itemsPerPage;
      //   return this.showprofile.OnGoingBatches.slice(startIndex, startIndex + this.itemsPerPage);
      // }

  // Get items for Upcoming Batches
      // get upcomingBatches(): any[] {
      //   const startIndex = (this.currentPageUpcomingBatches - 1) * this.itemsPerPage;
      //   return this.showprofile.UpcomingBatches.slice(startIndex, startIndex + this.itemsPerPage);
      // }

  // Get items for Online Events
      // get onlineEvents(): any[] {
      //   const startIndex = (this.currentPageOnlineEvents - 1) * this.itemsPerPage;
      //   return this.showprofile.onlineEventsThumbnailUrl.slice(startIndex, startIndex + this.itemsPerPage);
      // }

  // Get items for Offline Events
      // get offlineEvents(): any[] {
      //   const startIndex = (this.currentPageOfflineEvents - 1) * this.itemsPerPage;
      //   return this.showprofile.offlienEventsThumbnailUrl.slice(startIndex, startIndex + this.itemsPerPage);
      // }
  




//  redirect WhatsApp check Login Or Not
  handleWhatsAppClick() {
    if (this.token) {
      window.open(`https://wa.me/${this.showprofile.trainer.whatsapp_no}`, '_blank');
    } else {
      // Swal.fire({icon: 'warning',title: 'Please Login', text: 'You need to be logged in to contact via WhatsApp.',confirmButtonText: 'OK'});
      const modalElement = document.getElementById('CheckLoggedIN');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.show();
      }  
    }
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




 
  
//  Here get token For user Logged in or not for post Enquiry, question and reviews 
  token = sessionStorage.getItem('Authorization');

  enquiry = {
    description:'',
    trainerid:'',
  }
  
  postEnquiry(){
    if (!this.enquiry.description || this.enquiry.description.trim().length < 10) {
      Swal.fire('Sorry', 'Please enter a Enquiry that is at least 10 characters long to proceed.', 'warning');
      return;
    }

    if(this.token){
    this.dashboard.postEnquiry(this.enquiry).subscribe({
      next: (Response) =>{
        Swal.fire('Ohh...!', 'You are Enquiry send Successfully..!', 'success');
      },
      error : (error)=>{
        Swal.fire('Error', 'sorry..!', 'error');
      }
    })
  }
  else {
    const modalElement = document.getElementById('CheckLoggedIN');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }  }
  }
  

  question = {
    question:'',
    trainerid:'',
  }
  postquestion(){
    
    if (!this.question.question || this.question.question.trim().length < 10) {
      Swal.fire('Sorry', 'Please enter a question that is at least 10 characters long to proceed.', 'warning');
      return;
    }

    if(this.token){
    this.dashboard.postquestions(this.question).subscribe({
      next : (response) => {
        Swal.fire('Success', 'Your question has been submitted successfully!', 'success');
      },
      error : (Error) =>{
        Swal.fire('Error', 'sorry..!', 'error');
      }
    });
  }
  else{
    const modalElement = document.getElementById('CheckLoggedIN');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }  }
}

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
    t_id:'',
  }
  postreview(){
    if (!this.review.review || !this.review.star_count) {
      Swal.fire('Sorry', 'Please provide both a review and a star rating to submit your feedback.', 'warning');
      return;
    }
    if(this.token){
      this.review.star_count = this.rating;
    this.dashboard.postreview(this.review).subscribe({
      next : (Response) =>{
        Swal.fire('Ohh...!', 'You are Review Add Successfully..!', 'success');
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

  Appoinment = {
    date: '',
    time:'',
    t_id:'',
  }

  BookAppoinment(){
    if (!this.Appoinment.date || !this.Appoinment.time) {
      Swal.fire('Sorry', 'Please select both a date and a time to proceed with your appointment.', 'warning');
      return;
    }
    if(this.token){
    this.dashboard.BookApnmt(this.Appoinment).subscribe({
      next : (Response) =>{
        Swal.fire('Ohh...!', 'You are Appoinment send Successfully..!', 'success');
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


  
  // conver Rupees K or laks
  getFormattedPrice(price: number): string {
    if (price >= 100000) {
      return '₹' + (price / 100000).toFixed(1) + 'L';  // For lakhs
    } else if (price >= 1000) {
      return '₹' + (price / 1000).toFixed(1) + 'K';  // For thousands
    } else {
      return '₹' + price.toString();  // For rupees
    }
  }


  

  show: boolean = false;
  rememberMe: boolean = false;

  userData = {
    f_Name: '',
    middle_Name: '',
    l_Name: '',
    email_id: ' ',
    password: '',
    mobile_number: ' ',

  }




  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loginservices.postsignupdata(this.userData).subscribe({
        next: (response) => {
          sessionStorage.setItem("Authorization",response.token);
          this.authService.login(response.token); // Set login state
          Swal.fire('Congratulation',
            'Welcome to Ximbo! <br> Were thrilled to have you join our community of esteemed trainers, coaches, and educators. Ximbo is designed to empower you with the tools and resources needed to deliver exceptional training and create impactful learning experiences. <br> You Have Register successfully!',
             'success');
          this.closeModal();
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

  closeModal() {
    const modalElement = document.getElementById('CheckLoggedIN');
    const modalInstance = bootstrap.Modal.getInstance(modalElement); // Returns a Bootstrap modal instance
    if (modalInstance) {
      modalInstance.hide(); // Hides the modal
    }
  }
  
  // scroll pages in click on nav

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault(); // Prevent the default link click behavior
  
    const section = document.getElementById(sectionId);
  
    if (section) {
      const headerOffset = 70; // Adjust this value according to your header height
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY; // Get the section's position
      const offsetPosition = sectionPosition - headerOffset; // Adjust for the header
  
      // Smooth scroll to the section with an offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
  
  
  showcourseName = false;
  truncatecourseName(name: string): string {
   return name.length > 18 ? name.slice(0, 16) + '...' : name;
 }
 showbusinessName = false;
 trunbusinessName(name: string): string { 
  return name.length > 18 ? name.slice(0, 18) + '...' : name;
}
  
showupcommingName = false;
truncateupcomingName(name: string): string {
 return name.length > 18 ? name.slice(0, 16) + '...' : name;
}
showupcommingbusinessName = false;
trunupcommingbusinessName(name: string): string { 
return name.length > 18 ? name.slice(0, 18) + '...' : name;
}

}
