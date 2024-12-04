import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { FilterService } from '../common_service/filter.service';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {
  showtrainerData: any[] = [];
  filteredtrainer: any[] = [];
  selectedCategories: any; 
  searchTerm: string = ''; // New property for search term
  p: number = 1;
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 9; 
  
  constructor(private service: DashboardService, private filter: FilterService,
    private http: HttpClient, private searchService: SearchService
  ) {}
  
  showFullName = false;
  truncateBusinessName(name: string): string {
    return name.length > 18 ? name.slice(0, 15) + '...' : name;
  }

  ngOnInit(): void {
        this.loadtrainers(this.currentPage,this.itemsPerPage)

       this.filter.selectedCategories$.subscribe(categories => {
      this.selectedCategories = categories;
      this.filterTrainers(); // Re-filter on category selection
    });

    // Subscribe to search term changes
    this.searchService.currentSearchData.subscribe(term => {
      this.searchTerm = term;
      console.log('Received search term in TrainerComponent:', this.searchTerm);
      this.fetchTrainer(); // Fetch trainers based on search term
    });
  }

  loadtrainers(page: number, limit: number): void {
    this.service.gettrainerdata(page, limit).subscribe(data => {
      this.showtrainerData = data.trainers;
      console.log(this.showtrainerData);
      this.filteredtrainer = this.showtrainerData;
      this.totalItems = data.pagination.totalItems;
      this.filterTrainers(); // Initial filter
    });
  }

  filterTrainers(): void {
    this.filteredtrainer = this.showtrainerData; // Start with all fetched trainers
  
    if (this.searchTerm) {
      this.filteredtrainer = this.filteredtrainer.filter(trainer =>
        trainer.Business_Name || 
        trainer.f_Name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  
    // if (this.selectedCategories.length > 0) {
    //   this.filteredtrainer = this.filteredtrainer.filter(trainer =>
    //     this.selectedCategories.includes(trainer.categories?.toString()) 
    //   );
    // }

     if (this.selectedCategories.length > 0) {
      this.service.getTrainerdatacategory(this.currentPage, this.itemsPerPage, this.selectedCategories)
        .subscribe(result => {
          console.log("filtered category wise Events", result);  
          this.filteredtrainer = result.data.filter((trainer: any) => 
            trainer.categories.some((category: any) => 
              this.selectedCategories.includes(category)
            )
          );
        });   
    }

    
    
  
    // console.log('Filtered Trainers:', this.filteredtrainer); 
  }
  
  
  fetchTrainer(): void {
    if (this.searchTerm) {
      this.http.get<any>(`http://13.203.89.189/api/search/trainer?trainer_name=${this.searchTerm}`)
        .subscribe(
          (response) => {
            console.log('API Response:', response); // Log the whole response
  
            if (response && response.trainers) {
              this.showtrainerData = response.trainers; // Update showtrainerData with search results
            } else {
              this.showtrainerData = []; // Fallback to an empty array if no data
            }
  
            console.log('Fetched Trainers:', this.showtrainerData); // Log fetched data
            this.filterTrainers(); // Apply filter after fetching trainers
          },
          (error) => {
            console.error('Error fetching trainers:', error);
            this.showtrainerData = []; // Fallback to an empty array on error
            this.filterTrainers(); // Apply filter with no trainers
          }
        );
    } else {
      this.loadtrainers(this.currentPage,this.itemsPerPage)
    }
  }
  
   // Handle page change for pagination
   onPageChange(page: number): void {
    this.currentPage = page;
    this.loadtrainers(this.currentPage, this.itemsPerPage); 
    this.p = page;
  }

}


