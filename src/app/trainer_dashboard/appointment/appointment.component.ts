import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/common_service/trainer.service';
import Swal from 'sweetalert2';

declare var bootstrap: any;


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

      showAppointmentData : any;
      p: number = 1;
      totalItems = 0;
      currentPage = 1;
      itemsPerPage = 10;

      rejectionReason: string = ''; // To store the rejection reason
      selectedAppointmentId: string = ''; // To store the selected appointment ID for rejection
      
      constructor(private service:TrainerService){}

      ngOnInit(): void {
          
        this.loadAllAppointment(this.currentPage, this.itemsPerPage);
      }


      loadAllAppointment(page: number, limit: number){
        this.service.GetAppointment(page, limit).subscribe(data =>{
          this.showAppointmentData = data.data;
          console.log("apmt",data);
          
          this.totalItems = data.pagination.totalItems;
        })
      }


      onDelete(id: string): void {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to delete this Appointment? This action cannot be undone!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!', cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.isConfirmed) {
            this.service.deleteAppointmentbyID(id).subscribe(
              response => {
                Swal.fire('Deleted!','The Appointment has been deleted successfully.','success' );
                this.loadAllAppointment(this.currentPage, this.itemsPerPage);
              },
              error => {
                Swal.fire('Error!', 'An error occurred while deleting the Appointment.','error');
              }
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled','The Appointment is safe :', 'info');
          }
        });
      }

      // onApprove(){
      //   Swal.fire('confirmed','The Appointment is Approve :', 'success');
      // }



      onPageChange(page: number): void {
        this.currentPage = page;
        this.p = page;
        this.loadAllAppointment(this.currentPage, this.itemsPerPage); 
      }

      rejectAppointment(appointmentId: string): void {
        this.selectedAppointmentId = appointmentId;
        console.log("select APMT ID",appointmentId);
        
      }
    
      // Submit the rejection with the reason
      submitRejection(): void {
        if (this.rejectionReason) {
          this.service.rejectAppointment(this.selectedAppointmentId, this.rejectionReason).subscribe(
            (response) => {
              console.log('Appointment rejected', response);
              Swal.fire('Rejected','The Appointment is Rejected', 'success');
              bootstrap.Modal.getInstance(document.getElementById('rejectModal'))?.hide();
              this.loadAllAppointment(this.currentPage, this.itemsPerPage);
              this.rejectionReason = '';
              this.selectedAppointmentId = '';
            },
            (error) => {
              Swal.fire(
                'Technical Issue','We encountered a technical issue while processing your request. Please try again later.','error' );
              }
          );
        }
      }

      
      
    


      approveAppointment(id: string): void {
        this.service.approveAppointment(id).subscribe(
          (response) => {
            Swal.fire('Confirmed', 'The appointment has been approved.', 'success');
            this.loadAllAppointment(this.currentPage, this.itemsPerPage);
            console.log(response);
          },
          (error) => {
            console.error(error);
            Swal.fire('Error', 'There was an issue approving the appointment.', 'error');
          }
        );
      }

      

}
