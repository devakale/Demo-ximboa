import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/common_service/admin.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  
  _id: any;
  uploadform!: FormGroup;
  // category_name: any;
  // sub_title : any;
  category_image: File | null = null;


  constructor(private router: ActivatedRoute, private admin: AdminService, private formb: FormBuilder, private route:Router) {  
    this._id = this.router.snapshot.paramMap.get('_id');
  }

  ngOnInit() {
    this.uploadform = this.formb.group({
      _id: [''],
      category_name: ['', Validators.required],
      sub_title:['',Validators.required],
      category_image:['',Validators.required]
    });

    this.admin.getCategoryById(this._id).subscribe(d => {
      console.log('Category data:', d);
      this.uploadform.patchValue({
        _id: d._id,
        category_name: d.category_name,
        sub_title: d.sub_title
      });
      this.category_image = d.category_image; // Assuming this is a URL or path
    });
  }

  onFileSelected(event: any): void {
    this.category_image = event.target.files[0];
  }


  onSubmit() {
    const formData = new FormData();
  
    // Append non-file data
    formData.append('_id', this.uploadform.get('_id')?.value);
    formData.append('category_name', this.uploadform.get('category_name')?.value);
    formData.append('sub_title', this.uploadform.get('sub_title')?.value);

  
    // Append file data if a file is selected
    if (this.category_image) {
      formData.append('category_image', this.category_image);
    }
  
    this.admin.updateData(this._id, formData).subscribe({
      next: response => {
        console.log('Response:', response);
        // alert("Data Updated");
        Swal.fire('Success', 'Category updated successfully!', 'success');
        this.route.navigate(['admin/admincategory'])
      },
      error: error => {
        console.error('Update failed', error);
        // alert("Error");
        Swal.fire('Error', 'Error updating course.', 'error');
      }
    });
  }
  
}
