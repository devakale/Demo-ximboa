import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup ,NgForm,Validators} from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { DashboardService } from '../common_service/dashboard.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginService } from '../common_service/login.service';
import { AuthServiceService } from '../common_service/auth-service.service';


@Component({
  selector: 'app-forum-add-page',
  templateUrl: './forum-add-page.component.html',
  styleUrls: ['./forum-add-page.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class ForumAddPageComponent {

  Forum = {
    title:'',
    description: ''  // Ensure the name is correct here
};

constructor(private Service: DashboardService, private route:Router,
  private loginservices:LoginService,private authService:AuthServiceService) {}

token = sessionStorage.getItem('Authorization');
AddForum(): void {
  if(this.token){
  console.log(this.Forum);  // Check that the editor content is captured here
  this.Service.AddForum(this.Forum).subscribe({
    next: (response) => {
      Swal.fire('Ohh...!', 'Your question has been sent successfully!', 'success');
        this.route.navigate(['/forum']);
    },
    error: (error) => {
      Swal.fire('Error', 'Sorry, something went wrong.', 'error');
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

  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  form = new FormGroup({
    editorContent: new FormControl('', { validators: Validators.required }), // Correct usage
  });

  // get doc(): AbstractControl {
  //   return this.form.get('editorContent') as AbstractControl;
  // }

  ngOnInit(): void {
    this.editor = new Editor();

   
  }



  ngOnDestroy(): void {
    this.editor.destroy();
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
          Swal.fire('Congratulation','Welcome to Ximbo! <br> Were thrilled to have you join our community of esteemed trainers, coaches, and educators. Ximbo is designed to empower you with the tools and resources needed to deliver exceptional training and create impactful learning experiences. <br> You Have Register successfully!', 'success');
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
