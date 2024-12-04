import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/common_service/admin.service';
import { DashboardService } from 'src/app/common_service/dashboard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  showCategorydata: any[] = [];

  _id: any;
  uploadform!: FormGroup;
  thumbnail_image: File | null = null;

  constructor( 
    private router: ActivatedRoute,
    private admin: AdminService,
    private dashboard : DashboardService,
    private formb: FormBuilder,
    private route: Router
  ) {  
    this._id = this.router.snapshot.paramMap.get('_id');
  }

  ngOnInit() {
    this.uploadform = this.formb.group({
      _id: ['',Validators.required],
      course_name: ['',Validators.required],
      category_id: ['',Validators.required],
      online_offline: ['',Validators.required],
      trainer_id: ['',Validators.required],
      price: ['',Validators.required],
      offer_prize: ['',Validators.required],
      start_date: ['',Validators.required],
      end_date: ['',Validators.required],
      start_time: ['',Validators.required],
      end_time: ['',Validators.required],
      tags:['',Validators.required],
      course_information: ['',Validators.required],
      course_brief_info:['',Validators.required],
      thumbnail_image: ['',Validators.required] // This should be null for initialization
    });

    this.admin.getCourseById(this._id).subscribe(d => {
      console.log("Course Data",d);
      this.uploadform.patchValue({
        _id: d._id,
        course_name: d.course_name,
        category_id: d.category_id,
        online_offline: d.online_offline,
        trainer_id: d.trainer_id,
        price: d.price,
        offer_prize: d.offer_prize,
        start_date: d.start_date,
        end_date: d.end_date,
        start_time: d.start_time,
        end_time: d.end_time,
        tags: d.tags,
        course_information: d.course_information,
        course_brief_info:d.course_brief_info
      });
      this.thumbnail_image = d.thumbnail_image; // Clear previous image
    });

    this.dashboard.getcategoryname().subscribe(data => {
      console.log(data);
      this.showCategorydata = data;
    });
  }

  onFileSelected(event: any): void {
    // this.thumbnail_image = event.target.files[0];
    const file: File = event.target.files[0];
    if (file) {
      const maxFileSizeMB = 5;
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        Swal.fire('File Too Large',`The file is too large. Please upload an image smaller than ${maxFileSizeMB} MB.`,'error');
        this.thumbnail_image = null;
        return;
      }

      const allowedFileTypes = ['image/jpeg','image/jpg', 'image/png'];
      if (!allowedFileTypes.includes(file.type)) {
        Swal.fire('Invalid Format','Unsupported file format. Please upload a JPG, JPEG or PNG image.','error' );
        this.thumbnail_image = null;
        return;
      }

      const img = new Image();
      img.onload = () => {
        const maxWidth = 2000; 
        const maxHeight = 2000; 

        if (img.width > maxWidth || img.height > maxHeight) {
          Swal.fire('Invalid Resolution',`The image resolution exceeds the maximum allowed dimensions of ${maxWidth}x${maxHeight} pixels.`,'error');
          this.thumbnail_image = null;
          return;
        }

        this.thumbnail_image = file;
      };

      img.onerror = () => {
        Swal.fire('File Corrupted','The file appears to be corrupted. Please try a different image.','error');
        this.thumbnail_image = null;
      };

      img.src = URL.createObjectURL(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
        
    formData.append('_id',this.uploadform.get('_id')?.value);
    formData.append('course_name',this.uploadform.get('course_name')?.value);
    formData.append('category_id',this.uploadform.get('category_id')?.value);
    formData.append('online_offline',this.uploadform.get('online_offline')?.value);
    formData.append('price',this.uploadform.get('price')?.value);
    formData.append('offer_prize',this.uploadform.get('offer_prize')?.value);
    formData.append('start_date',this.uploadform.get('start_date')?.value);
    formData.append('end_date',this.uploadform.get('end_date')?.value);
    formData.append('start_time',this.uploadform.get('start_time')?.value);
    formData.append('end_time',this.uploadform.get('end_time')?.value);
    formData.append('tags',this.uploadform.get('tags')?.value);
    formData.append('course_information',this.uploadform.get('course_information')?.value);
    formData.append('course_brief_info',this.uploadform.get('course_brief_info')?.value);

      
    // Append file data if a file is selected
    if (this.thumbnail_image) {
      formData.append('thumbnail_image', this.thumbnail_image);
    }
  
  
    this.admin.updateCorseByID(this._id, formData).subscribe({
      next: response => {
        console.log('Update Response:', response); // Log response for debugging
        Swal.fire('Success', 'Course updated successfully!', 'success');
        this.route.navigate(['trainer/mycourse'])
      },
      error: error => {
        console.error('Update failed', error); // Log error for debugging
        Swal.fire('Error', 'Error updating course.', 'error');
      }
    });
  }
  
}
