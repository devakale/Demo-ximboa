import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/common_service/trainer.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  ShowQuestion:any;

  p: number = 1;
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private service:TrainerService){}

  ngOnInit(): void {
    this.loadAllQuestion(this.currentPage, this.itemsPerPage);
  }

  loadAllQuestion(page: number, limit: number){
    this.service.GetQuestion(page, limit).subscribe(data => {            
      this.ShowQuestion = data.data;
      console.log(this.ShowQuestion);
      this.totalItems = data.pagination.totalItems;
    })
  }

  onDelete(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this Question? This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!', cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteQuestionBYID(id).subscribe(
          response => {
            Swal.fire('Deleted!','The Question has been deleted successfully.','success' );
            this. loadAllQuestion(this.currentPage, this.itemsPerPage);
          },
          error => {
            Swal.fire('Error!', 'An error occurred while deleting the Question.','error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled','The Question is safe :)', 'info');
      }
    });
  }





  onPageChange(page: number): void {
    this.currentPage = page;
    this.p = page;
    this.loadAllQuestion(this.currentPage, this.itemsPerPage); 
  }

}
