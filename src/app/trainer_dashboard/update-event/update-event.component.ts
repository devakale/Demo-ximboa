import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/common_service/admin.service';
import { DashboardService } from 'src/app/common_service/dashboard.service';
import { TrainerService } from 'src/app/common_service/trainer.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  _id: any;
  uploadform!: FormGroup;
  showCategorydata: any[] = [];
  event_thumbnail: File | null = null;

  formSubmitted: boolean = false;


  constructor(
    private router: ActivatedRoute,
    private service: TrainerService,
    private formb: FormBuilder,
    private route: Router,
    private admin: AdminService,
    private dashborad: DashboardService
  ) {
    this._id = this.router.snapshot.paramMap.get('_id');
  }

  ngOnInit() {

    this.dashborad.getcategoryname().subscribe(data => {
      this.showCategorydata = data;
    });

    this.uploadform = this.formb.group({
      _id: [''],
      event_name: ['', Validators.required],
      event_type: ['', Validators.required],
      event_categories: ['', Validators.required],
      event_date: ['', Validators.required],
      event_start_time: ['', Validators.required],
      event_end_time: ['', Validators.required],
      event_location: ['', Validators.required],
      estimated_seats: ['', Validators.required],
      event_languages: ['', Validators.required],
      event_info: ['', Validators.required],
      event_description: ['', Validators.required],
      event_thumbnail: ['', Validators.required],
    });


    this.service.geteventbyID(this._id).subscribe((d: any) => {
      console.log('event data:', d);
      this.uploadform.patchValue({
        _id: d._id,
        event_name: d.event_name,
        event_type: d.event_type,
        event_categories: d.event_categories,
        event_date: d.event_date,
        event_start_time: d.event_start_time,
        event_location: d.event_location,
        estimated_seats: d.estimated_seats,
        event_languages: d.event_languages,
        event_info: d.event_info,
        event_description: d.event_description,
        event_end_time: d.event_end_time,
      });
      this.event_thumbnail = d.event_thumbnail;
    });
  }


  onFileSelected(event: any): void {
    // this.event_thumbnail = event.target.files[0];
    const file: File = event.target.files[0];
    if (file) {
      const maxFileSizeMB = 5;
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        Swal.fire('File Too Large',`The file is too large. Please upload an image smaller than ${maxFileSizeMB} MB.`,'error');
        this.event_thumbnail = null;
        return;
      }

      const allowedFileTypes = ['image/jpeg','image/jpg', 'image/png'];
      if (!allowedFileTypes.includes(file.type)) {
        Swal.fire('Invalid Format','Unsupported file format. Please upload a JPG, JPEG or PNG image.','error' );
        this.event_thumbnail = null;
        return;
      }

      const img = new Image();
      img.onload = () => {
        const maxWidth = 2000; 
        const maxHeight = 2000; 

        if (img.width > maxWidth || img.height > maxHeight) {
          Swal.fire('Invalid Resolution',`The image resolution exceeds the maximum allowed dimensions of ${maxWidth}x${maxHeight} pixels.`,'error');
          this.event_thumbnail = null;
          return;
        }

        this.event_thumbnail = file;
      };

      img.onerror = () => {
        Swal.fire('File Corrupted','The file appears to be corrupted. Please try a different image.','error');
        this.event_thumbnail = null;
      };

      img.src = URL.createObjectURL(file);
    }
  }



  onSubmit() {
    
    // this.formSubmitted = true;
    // if (this.uploadform.invalid) {
    //   Swal.fire('Validation Error', 'Please ensure all required fields are filled out correctly before submitting.', 'warning');
    //   return;
    // }

    const formData = new FormData();
    Object.keys(this.uploadform.controls).forEach(key => {
      const controlValue = this.uploadform.get(key)?.value;
      if (key === 'event_thumbnail' && this.event_thumbnail) {
        formData.append(key, this.event_thumbnail);
      } else {
        formData.append(key, controlValue);
      }
    });

    this.service.UpdateEventbyID(this._id, formData).subscribe({
      next: (response) => {
        Swal.fire('Success', 'Event updated successfully!', 'success');
      },

      error: error => {
        console.error('Update failed', error);
        Swal.fire('Error', 'Error updating event. Please try again later.', 'error');
      }
    });
  }
}


