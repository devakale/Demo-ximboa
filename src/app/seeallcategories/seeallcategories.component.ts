import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { FilterService } from '../common_service/filter.service';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../search.service';



@Component({
  selector: 'app-seeallcategories',
  templateUrl: './seeallcategories.component.html',
  styleUrls: ['./seeallcategories.component.css']
})
export class SeeallcategoriesComponent implements OnInit {

  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 9; 
  ShowCourseData: any[] = [];   
  filteredCourses: any;  
  selectedCategory: string[] = []; 
  p: number = 1;
  term:any;
  searchTerm: string = '';
  courses: any[] = [];

  currentSortOption: string = '';

  constructor(private service: DashboardService, private filter: FilterService,
    private http:HttpClient, private searchService: SearchService) {}

  ngOnInit(): void {
    this.loadCourses(this.currentPage, this.itemsPerPage);
    this.filter.selectedCategories$.subscribe(selectedCategoriesresult => {
      this.selectedCategory = selectedCategoriesresult;
      console.log('Received Selected category:', this.selectedCategory);
     this.applyFilter();
    });
    
    this.searchService.currentSearchData.subscribe((term) => {
      this.searchTerm = term;
      console.log('Received search term in SeeAllCategoriesComponent:', this.searchTerm);  // Log the search term
      this.searchFilter();
      this.fetchCourses();
    });

    this.searchService.sortOption$.subscribe(option => {
      this.currentSortOption = option;
      console.log('Received Sort Option:', this.currentSortOption);
      this.applyFilter();
    });
  

}
  // Fetch courses from the backend
  
  loadCourses(page: number, limit: number): void {
    this.service.getcouserdata(page, limit).subscribe(result => {
      console.log(result);
      this.ShowCourseData = result?.coursesWithFullImageUrl;
      this.filteredCourses = this.ShowCourseData;
      this.totalItems = result.pagination.totalItems;
    });
  }



  searchFilter(): void{
    this.filteredCourses = this.ShowCourseData;
    if (this.searchTerm) {
      this.filteredCourses = this.filteredCourses.filter((course: any) =>
        course.course_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.totalItems = this.filteredCourses.length;
    }
  }

  applyFilter(): void {
    // Reset to full data initially
    this.filteredCourses = this.ShowCourseData;
  
    // Check if categories are selected
    if ( this.selectedCategory.length > 0) {
      // API call when categories are selected
      this.service.getcouserdatacategory(this.currentPage, this.itemsPerPage, this.selectedCategory[0], this.currentSortOption)
        .subscribe(result => {
          console.log("Filtered category-wise courses:", result); 
 
          this.filteredCourses = result?.data.filter((course: any) =>
            this.selectedCategory.includes(course.category_name)
          
          );
          this.totalItems = result.pagination.totalItems;
        });
    } else if (this.currentSortOption){
      // API call for sort option without categories
      this.service.getcouserdatacategory(this.currentPage, this.itemsPerPage,this.selectedCategory[0], this.currentSortOption)
        .subscribe(result => {
          console.log("Courses with sort option only: ", result);
          this.ShowCourseData = result?.data;
          this.filteredCourses = this.ShowCourseData;
          this.totalItems = result.pagination.totalItems;
        });
    } else {
      // If no categories and no sort option selected, do nothing or show default data
      console.log("No filter applied; showing default data.");
      this.filteredCourses = this.ShowCourseData; // Default to unfiltered data
      this.totalItems = this.ShowCourseData.length;
    }  
  }
  
 
  onPageChange(page: number): void {
    this.currentPage = page;
    this.p = page;
    this.loadCourses(this.currentPage, this.itemsPerPage); 
  }


  fetchCourses() {
    if (this.searchTerm) {
      this.http.get<any>(`https://rshvtu5ng8.execute-api.ap-south-1.amazonaws.com/api/search/courses?course_name=${this.searchTerm}`)
        .subscribe(
          (response) => {
            this.ShowCourseData = response.data;
            console.log('Fetched Courses:', response);  
            this.totalItems = response.pagination.totalItems;
            
          },
          (error) => {
            console.error('Error fetching courses:', error);
          }
        );
    } else {
      this.loadCourses(this.currentPage, this.itemsPerPage);   
    }
  }
  
    // conver Rupees K or laks
    getFormattedPrice(price: number): string {
      if (price >= 100000) {
        return '₹' + (price / 100000).toFixed(1) + 'L';  
      } else if (price >= 1000) {
        return '₹' + (price / 1000).toFixed(1) + 'K'; 
      } else {
        return '₹' + price.toString(); 
      }
    }


    showcourseName = false;
    truncatecourseName(name: string): string {
     return name.length > 18 ? name.slice(0, 13) + '...' : name;
   }
   showbusinessName = false;
  trunbusinessName(name: string): string {
   return name.length > 18 ? name.slice(0, 16) + '...' : name;
 }
    
}
