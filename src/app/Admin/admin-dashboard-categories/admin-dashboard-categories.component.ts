import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/common_service/admin.service';
import { DashboardService } from 'src/app/common_service/dashboard.service';
import Swal from 'sweetalert2';
declare var bootstrap: any;


@Component({
  selector: 'app-admin-dashboard-categories',
  templateUrl: './admin-dashboard-categories.component.html',
  styleUrls: ['./admin-dashboard-categories.component.css']
})
export class AdminDashboardCategoriesComponent implements OnInit {

  showIcon = false;
  toggleIcon() {
    this.showIcon = !this.showIcon;
  }
  showCategorydata: any[] = [];
  category_name: string = '';
  sub_title:string = '';
  category_image: File | null = null;

  categoryId: string = ''; 
  subCategoryName: string = '';

  subcategory:any;
  fetchcategoryID:any;
  subCategoryID: string = ''; 
  isEditingCategory: boolean = false;


  constructor(private categoryService:AdminService, private dashboard : DashboardService  ){}

  ngOnInit(): void{
    this.getallcategory();
    // this.getsubcategory();
  }

    getallcategory(){
      this.dashboard.getcategoryname().subscribe( data =>{
        console.log('Data retrieved: ', data); 
        this.showCategorydata = data;
      });
    }

  onFileSelected(event: any): void {
    this.category_image = event.target.files[0];
  }

  onSubmit(): void {
    if (!this.category_name || !this.sub_title || !this.category_image) {
      Swal.fire('Validation Error', 'All fields are required!', 'error');
      return;
    }

    if (this.category_name && this.category_image) {
      this.categoryService.postCategory(this.category_name,this.sub_title, this.category_image).subscribe(
        response => {
          // console.log('Category posted successfully', response);
          Swal.fire('Ohh...!', 'Category Added Successfully..!', 'success');
          bootstrap.Modal.getInstance(document.getElementById('AddcategoryModal'))?.hide();
          this.getallcategory();
        },
        error => {
          console.error(alert("Category Allready Exit..!"),'Error posting category', error);
        }
      );
    }
  }


    onDelete(id: string): void {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this Category? This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!', cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.isConfirmed) {
          this.categoryService.deletecategorybyID(id).subscribe(
            response => {
              Swal.fire('Deleted!','The category has been deleted successfully.','success' );
              this.getallcategory();
            },
            error => {
              Swal.fire('Error!', 'An error occurred while deleting the category.','error');
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled','The category is safe :)', 'info');
        }
      });
    }
    
    Addsubcategory() {
      if (!this.categoryId || !this.subCategoryName) {
        console.error('All fields are required!');
        return;
      }
      this.categoryService.AddSubCategory(this.categoryId, this.subCategoryName).subscribe(
        (response) => {
          Swal.fire('Ohh...!', 'Category Added Successfully..!', 'success');
          bootstrap.Modal.getInstance(document.getElementById('AddsubcategoryModal'))?.hide();
          this.resetForm();
        },
        (error) => {
          Swal.fire('Sorry', 'Error Adding category', 'error');
        }
      );
    }
  
    resetForm() {
      this.categoryId = '';
      this.subCategoryName = '';
    }
  
    getsubcategory(): void {
          this.categoryService.getsubcategorybyCategoryID(this.fetchcategoryID).subscribe(result => {
                  this.subcategory = result.data || [];        
          });
    }
  


 // This function is triggered when a category is selected
 onCategorySelect(event: Event): void {
  const selectedCategoryName = (event.target as HTMLInputElement).value;
  const selectedCategory = this.showCategorydata.find(
    category => category.category_name === selectedCategoryName
  );
  
  if (selectedCategory) {
    this.fetchcategoryID = selectedCategory._id;  // Assign the category ID
    this.category_name = selectedCategory.category_name;  // Pre-fill the category name for editing (if needed)
    console.log('Selected Category ID:', this.fetchcategoryID);
    this.getsubcategory();  // Fetch subcategories for the selected category
    this.isEditingCategory = false;  // Make sure we are not editing the category name
  } else {
    console.error('Selected category not found!');
  }
}

// This function is triggered when a subcategory is clicked for editing
onSubCategoryClick(subCategory: any): void {
  // Set the subcategory name and ID to pre-fill the editable input field
  this.subCategoryName = subCategory.sub_category_name;
  this.subCategoryID = subCategory._id;
  console.log('Editing subcategory', subCategory);
}

// Update the subcategory when user clicks Save
updateSubCategory(): void {
  if (this.subCategoryName && this.subCategoryID && this.fetchcategoryID) {
    const updatedSubCategory = {
      id: this.subCategoryID,
      sub_category_name: this.subCategoryName,
      category_id: this.fetchcategoryID  // Pass the category ID as part of the request
    };

    this.categoryService.SubCategoryUpdate(updatedSubCategory.id, updatedSubCategory.sub_category_name, updatedSubCategory.category_id)
      .subscribe(response => {
        bootstrap.Modal.getInstance(document.getElementById('updatesubcategoryModal'))?.hide();
        console.log('Subcategory updated successfully:', response);
        this.getsubcategory(); // Refresh the subcategory list after update
      }, error => {
        console.error('Error updating subcategory:', error);
      });
  } else {
    console.error('Subcategory name or ID is invalid!'); 
  }
}
  
      
}
