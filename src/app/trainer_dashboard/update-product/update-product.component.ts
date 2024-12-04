import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainerService } from 'src/app/common_service/trainer.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  _id: any;
  uploadform!: FormGroup;
  product_image: File | null = null;
  product_gallary: File | null = null;

  constructor(
    private router: ActivatedRoute, 
    private service: TrainerService, 
    private formb: FormBuilder, 
    private route: Router
  ) {  
    this._id = this.router.snapshot.paramMap.get('_id');
  }

  ngOnInit() {
    this.uploadform = this.formb.group({
      product_name: ['', Validators.required],
      product_prize: ['', Validators.required],
      product_selling_prize: ['', Validators.required],
      products_info: ['', Validators.required],
      product_flag: ['',Validators.required],
      products_description: ['',Validators.required],
      product_image: [''],
      product_gallary: [''],
    });

    this.service.getproductById(this._id).subscribe((d : any) => {
      console.log("Product data",d);
      // console.log(this.uploadform.controls["product_name"].setValue("123"));
      this.uploadform.patchValue({
        product_name: d.product_name,
        product_prize: d.product_prize,
        product_selling_prize: d.product_selling_prize,
        products_info: d.products_info,
        product_flag: d.product_flag,
        products_description: d.products_description
      });

      this.product_image = d.product_image;
      this.product_gallary = d.product_gallary;
    });
  }

  onFileSelected(event: any) {
    // this.selectedFile = event.target.files[0] as File;
    const file: File = event.target.files[0];
    if (file) {
      const maxFileSizeMB = 5;
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        Swal.fire('File Too Large',`The file is too large. Please upload an image smaller than ${maxFileSizeMB} MB.`,'error');
        this.product_image = null;
        return;
      }

      const allowedFileTypes = ['image/jpeg','image/jpg', 'image/png'];
      if (!allowedFileTypes.includes(file.type)) {
        Swal.fire('Invalid Format','Unsupported file format. Please upload a JPG, JPEG or PNG image.','error' );
        this.product_image = null;
        return;
      }

      const img = new Image();
      img.onload = () => {
        const maxWidth = 2000; 
        const maxHeight = 2000; 

        if (img.width > maxWidth || img.height > maxHeight) {
          Swal.fire('Invalid Resolution',`The image resolution exceeds the maximum allowed dimensions of ${maxWidth}x${maxHeight} pixels.`,'error');
          this.product_image = null;
          return;
        }

        this.product_image = file;
      };

      img.onerror = () => {
        Swal.fire('File Corrupted','The file appears to be corrupted. Please try a different image.','error');
        this.product_image = null;
      };

      img.src = URL.createObjectURL(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('product_name', this.uploadform.get('product_name')?.value);
    formData.append('product_prize', this.uploadform.get('product_prize')?.value);
    formData.append('product_selling_prize', this.uploadform.get('product_selling_prize')?.value);
    formData.append('products_info', this.uploadform.get('products_info')?.value);
    formData.append('product_flag', this.uploadform.get('product_flag')?.value);
    formData.append('products_description', this.uploadform.get('products_description')?.value);
  
    if (this.product_image) {
      formData.append('product_image', this.product_image);
    }
    if (this.product_gallary) {
      formData.append('product_gallary', this.product_gallary);
    }
  
    this.service.updateproductbyID(this._id, formData).subscribe({
      next: response => {
        // console.log('Response:', response);
        Swal.fire('Success', 'Product updated successfully!', 'success');
        this.route.navigate(['/dashboard/product']);
      },
      error: error => {
        // console.error('Update failed', error);
        Swal.fire('Error', 'Error updating course.', 'error');
      }
    });
  }
}
