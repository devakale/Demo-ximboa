import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  ShowForumdata: any[] = [];

  constructor(private service: DashboardService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.service.GetAllForum().subscribe(result => {
      this.ShowForumdata = result?.data.map((forum:any) => ({
        ...forum,
        sanitizedDescription: this.sanitizer.bypassSecurityTrustHtml(forum.description)
      }));
      console.log(this.ShowForumdata);
    });
  }
}
