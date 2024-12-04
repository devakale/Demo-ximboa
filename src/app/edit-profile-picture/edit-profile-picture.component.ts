
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TrainerService } from '../common_service/trainer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile-picture',
  templateUrl: './edit-profile-picture.component.html',
  styleUrls: ['./edit-profile-picture.component.css']
})
export class EditProfilePictureComponent implements OnInit, OnDestroy {

  currentImage: string | null = null; 
  trainer_image: File | null = null;
  maxFileSizeMB: number = 5; 
  allowedFileTypes: string[] = ['image/jpeg', 'image/jpg', 'image/png']; 
  maxResolution = { width: 800, height: 800 }; 
  uploadAttempts = 0;
  maxAttempts = 5;
  imageObjectURL: string | null = null; 

  constructor(private service: TrainerService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadTrainerData();
  }

  ngOnDestroy(): void {
    if (this.imageObjectURL) {
      URL.revokeObjectURL(this.imageObjectURL);
    }
  }

  loadTrainerData(): void {
    this.service.gettrainerbyID().subscribe((data: any) => {   
      this.currentImage = data.trainer_image;
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    
    if (!file) return;
    if (file.size > this.maxFileSizeMB * 1024 * 1024) {
      Swal.fire('File Too Large', `The file is too large. Please upload an image smaller than ${this.maxFileSizeMB} MB.`, 'error');
      return;
    }

    if (!this.allowedFileTypes.includes(file.type)) {
      Swal.fire('Invalid Format', 'Unsupported file format. Please upload a JPG, JPEG or PNG image.', 'error');
      return;
    }

    const img = new Image();
    this.imageObjectURL = URL.createObjectURL(file); 
    img.src = this.imageObjectURL;

    img.onload = () => {
      const { width, height } = img;
      if (width > this.maxResolution.width || height > this.maxResolution.height) {
        Swal.fire('Invalid Resolution', `Please upload an image with a resolution no larger than ${this.maxResolution.width}x${this.maxResolution.height} pixels.`, 'error');
        URL.revokeObjectURL(this.imageObjectURL!); 
        this.imageObjectURL = null;
        return;
      }

      this.trainer_image = file;

      // Clean up the object URL
      URL.revokeObjectURL(this.imageObjectURL!);
      this.imageObjectURL = null;
    };

    img.onerror = () => {
      Swal.fire('File Corrupted', 'The file appears to be corrupted. Please try a different image.', 'error');
      URL.revokeObjectURL(this.imageObjectURL!); // Clean up URL
      this.imageObjectURL = null;
    };
  }

  onSubmit(): void {
    if (!this.trainer_image) {
      Swal.fire('Error', 'Please select an image to upload.', 'error');
      return;
    }

    if (this.uploadAttempts >= this.maxAttempts) {
      Swal.fire('Too Many Attempts', 'You’ve made too many upload attempts. Please wait a few minutes before trying again.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('trainer_image', this.trainer_image);

    this.service.updatetrainerDetails(formData).subscribe({
      next: () => {
        Swal.fire('Success', 'Image updated successfully.', 'success');
        this.loadTrainerData();
        this.cd.detectChanges();
        this.uploadAttempts = 0; 
      },
      error: (error: any) => {
        if (error.status === 0) {
          Swal.fire('Network Error', 'Network issue detected. Please check your connection and try again.', 'error');
        } else {
          Swal.fire('Upload Failed', 'There was an error uploading your profile image. Please try again.', 'error');
        }
        this.uploadAttempts++;
      }
    });
  }
}
