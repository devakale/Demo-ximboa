import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/common_service/trainer.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {

  showenquirydata : any;
  p: number = 1;
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private service:TrainerService){}

    ngOnInit(): void {
      this.loadAllEnquiry(this.currentPage, this.itemsPerPage);
    }


    loadAllEnquiry(page: number, limit: number){
      this.service.GetEnquiry(page, limit).subscribe(data => {            
        this.showenquirydata = data.data;
        console.log(this.showenquirydata);
        this.totalItems = data.pagination.totalItems;
      })
    }

   

    onDelete(id: string): void {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this Enquiry? This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!', cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteEnquiryBYID(id).subscribe(
            response => {
              Swal.fire('Deleted!','The Enquiry has been deleted successfully.','success' );
              this.loadAllEnquiry(this.currentPage, this.itemsPerPage);
            },
            error => {
              Swal.fire('Error!', 'An error occurred while deleting the Enquiry.','error');
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled','The Enquiry is safe :)', 'info');
        }
      });
    }



    onPageChange(page: number): void {
      this.currentPage = page;
      this.p = page;
      this.loadAllEnquiry(this.currentPage, this.itemsPerPage); 
    }
}
