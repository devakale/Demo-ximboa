import { Component, OnInit } from '@angular/core';
import { LoginService } from '../common_service/login.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent  implements OnInit{

  id:any;
  getrequest:any[]=[];
  getapprovedrequest:any;
  getRejectedrequest:any;
  UserDetailsinfo:any;

    constructor(private role:LoginService,private router:ActivatedRoute)
    {}

    ngOnInit(): void {

      this.router.paramMap.subscribe(params => {
        this.id = params.get('id');
        if (this.id) {
          this.UserDetails(); // Fetch user details when 'id' is available
        }
      });

      this.getallrequest();

      this.getallApprovalreuest();

      this.getAllRejectRequest();

      


    }

    getallrequest(){
      this.role.getrolerequest().subscribe(data =>{
        console.log(data,"request");
        this.getrequest = data.data;
      })
    }

    getallApprovalreuest(){
      this.role.getroleApprovedrequest().subscribe(result =>{
        this.getapprovedrequest = result.data;
        console.log(result,"approved"); 
     });
    }

    getAllRejectRequest(){
      this.role.getRejectRequest().subscribe(result =>{
        this.getRejectedrequest = result.data;
        console.log(result,"Rejected"); 
     });
    }


  // handleApproval(userid: string, approved: number) {
  //   const data = { userid, approved };
  //   console.log("view data", data);
    
  //   this.role.RoleChange(data).subscribe(response => {
  //     if (data.approved === 1) {
  //       console.log("check approved",approved);
  //       Swal.fire('Request Approved','The user’s role has been successfully updated.','success');
  //       this.getallrequest();
  //     } else if (data.approved === 0) {
  //       Swal.fire('Request Rejected','The user’s request has been successfully deleted.','success');
  //       this.getallrequest();
  //     }
  //   });
  // }

  handleApproval(userid: string, approved: number) {
    const data = { userid, approved };
    console.log("view data", data);
    
    if (data.approved === 0) {
      // Add confirmation dialog before rejection
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to reject this request? This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, reject it',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          // User confirmed, proceed with the rejection logic
          this.role.RoleChange(data).subscribe(response => {
            Swal.fire('Request Rejected', 'The user’s request has been successfully deleted.', 'success');
            this.getallrequest();
            this.getAllRejectRequest();
          });
        }
      });
    } else if (data.approved === 1) {
      this.role.RoleChange(data).subscribe(response => {
        console.log("check approved", approved);
        Swal.fire('Request Approved', 'The user’s role has been successfully updated.', 'success');
        this.getallrequest();
        this.getallApprovalreuest();
      });
    }
  }
  

  
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'Do you want to delete this Category? This action cannot be undone!',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes, delete it!', cancelButtonText: 'No, keep it'
    // }).then(data.approved === 0) {
    //   Swal.fire('Request Rejected','The user’s request has been successfully deleted.','success');
    //   this.getallrequest();
    //   } else if (result.dismiss === Swal.DismissReason.cancel) {
    //     Swal.fire('Cancelled','The category is safe :)', 'info');
    //   }
    // });
  
  

  
  

UserDetails() {
    if (this.id) {
      this.role.getuserdetail(this.id).subscribe(result => {
        this.UserDetailsinfo = result;
        console.log("User Details:", this.UserDetailsinfo);
      });
    }
  }
  
  openUserDetailsModal(userId: string): void {
    this.role.getuserdetail(userId).subscribe(result => {
      this.UserDetailsinfo = result;
      console.log("Fetched User Details:", this.UserDetailsinfo); // Debugging
    });
  }
  
  
}
