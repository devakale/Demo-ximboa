import { Component, OnInit } from '@angular/core';
import { LoginService } from '../common_service/login.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthServiceService } from '../common_service/auth-service.service';
import { RealoadServiceService } from '../common_service/reaload-service.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

 
 password: string='';
  rememberMe: boolean = false;

   userData= {
      f_Name:'',
      middle_Name:'',
      l_Name:'',
      email_id:'',
      password:'',
      mobile_number:'',

  }
  constructor(private loginservices:LoginService,private route:Router,private authService:AuthServiceService,private realoadservice: RealoadServiceService){ }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (form.valid && this.rememberMe) {
      // Submit form if valid and checkbox is checked
      this.loginservices.postsignupdata(this.userData).subscribe({
        next: (response) => {
          sessionStorage.setItem("Authorization", response.token);
          this.route.navigate(['/dashboard']);
          this.authService.login(response.token); // Set login state
          this.realoadservice.triggerReloadHeader();
          Swal.fire(
            'Congratulations',
            'Welcome to Ximbo! <br> We’re thrilled to have you join our community of esteemed trainers, coaches, and educators. Ximbo is designed to empower you with the tools and resources needed to deliver exceptional training and create impactful learning experiences. <br> You have registered successfully!',
            'success');
         
        },
        error: (error) => {
            let errorMessage = 'Please enter valid details.';
            if (error.error && typeof error.error === 'string') {
              errorMessage = error.error;
            } else if (error.error && error.error.message) {
              errorMessage = error.error.message;
            }
            Swal.fire('Error', errorMessage, 'error');
        },
      });
    } else if (!this.rememberMe) {
      // Show error if checkbox is unchecked
      Swal.fire('Error', 'You must accept the Terms & Conditions to submit the form.', 'error');
    } else {
      console.log('Form is invalid');
    }
  }
  
  // Hide And Show Password Logic  
  show: boolean = false;
  togglePassword() {
    this.show = !this.show;
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  
  limitToTenDigits(): void {
    if (this.userData.mobile_number.length > 10) {
      this.userData.mobile_number = this.userData.mobile_number.slice(0, 10);
    }
  }
  
}
