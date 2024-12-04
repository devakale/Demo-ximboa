import { Component, OnInit } from '@angular/core';
import { LoginService } from '../common_service/login.service';
import {  Router } from '@angular/router';
import { AuthServiceService } from '../common_service/auth-service.service';
import Swal from 'sweetalert2';
import { jwtDecode } from "jwt-decode";
import { RealoadServiceService } from '../common_service/reaload-service.service';
declare var bootstrap: any;


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    
  email_id: string = '';
  password: string = '';
  message: string = '';
  show: boolean = false; 
  rememberMe: boolean = false;
   token = "";
   decoded:any;


  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthServiceService,
    private route:Router,
    private realoadservice: RealoadServiceService
  ) {}

  ngOnInit(): void {

    // console.log(this.decoded);

  }

  

  onSubmit(token: string) {
    
    this.loginService.login(token).subscribe({
      next: (response: any) => { 
        sessionStorage.setItem("Authorization",response.token);
            this.route.navigate(['/dashboard']);
            this.authService.login(response.token); // Set login state
            this.realoadservice.triggerReloadHeader();
        Swal.fire('','We’re excited to see you again. Your login was successful, and you’re now ready to continue creating amazing learning experiences.', 'success');
      },
      error: () => { 
        this.message = 'An error occurred';
        //alert("Invalid credentials. Please try again");
        Swal.fire('Error', 'Your email or password is incorrect. Try again...', 'error');

      }
    });
  }

  forget = {
    email_id:' ',
  }

  forgotpwd() {
    this.loginService.forgotpassword(this.forget).subscribe({
      next: (response: any) => { 
        Swal.fire('', 'Password Reset Link sent to your Email ID', 'success');  
        this.closeModal();
      },
      error: (error: any) => { 
        // Check the error from backend and show appropriate message
        if (error.status === 400) {
          // Backend response for invalid email format or missing email
          Swal.fire('Error', 'Please enter a valid email address, like name@example.com.', 'error');
        } else if (error.status === 404) {
          // Email not found in the system
          Swal.fire('Error', 'Email Not Registered. If an account with this email exists, a password reset link has been sent.', 'error');
        } else if (error.status === 429) {
          // Rate limiting error (Too many requests)
          Swal.fire('Error', 'Multiple requests detected. Please wait a few minutes before trying again.', 'error');
        } else if (error.status === 410) {
          // Expired or invalid reset link
          Swal.fire('Error', 'This password reset link has expired or is invalid. Please request a new one.', 'error');
        } else {
          // General error (e.g., server issue)
          Swal.fire('Error', 'An error occurred while processing your request. Please try again later or contact support.', 'error');
        }
      }
    });
  }
  

  togglePassword() {
    this.show = !this.show;
  }


  closeModal() {
    const modalElement = document.getElementById('forgotpwd');
    const modalInstance = bootstrap.Modal.getInstance(modalElement); // Returns a Bootstrap modal instance
    if (modalInstance) {
      modalInstance.hide(); // Hides the modal
    }
  }

  
  
  

}
