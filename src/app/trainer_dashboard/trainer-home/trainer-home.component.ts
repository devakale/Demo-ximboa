import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/common_service/auth-service.service';

@Component({
  selector: 'app-trainer-home',
  templateUrl: './trainer-home.component.html',
  styleUrls: ['./trainer-home.component.css']
})
export class TrainerHomeComponent implements OnInit{

  isTrainer: boolean = false;
  isUser: boolean = false;
  isAdmin: boolean = false;
  isInstitute: boolean = false;
  isSELF_EXPERT: boolean = false

  constructor(private auth: AuthServiceService,private route:Router) {}

  ngOnInit(): void {
    this.checkUserRole();
  }

  checkUserRole() {
    const role = this.auth.getUserRole();
    console.log('User Role:', role);

    this.isAdmin = role === 'SUPER_ADMIN';
    this.isTrainer = role === 'TRAINER';
    this.isInstitute = role === 'INSTITUTE';
    this.isSELF_EXPERT = role == 'SELF_EXPERT';
    this.isUser = role === 'USER' || role === 'TRAINER' || role === 'SUPER_ADMIN' || role === 'INSTITUTE' || role === 'SELF_EXPERT';

    console.log('isTrainer:', this.isTrainer, 'isUser:', this.isUser, 'isAdmin:', this.isAdmin, this.isInstitute, this.isSELF_EXPERT);
  }
  
  logout() {
    this.auth.logout();
      this.route.navigate(['/'])
  }
  

}
