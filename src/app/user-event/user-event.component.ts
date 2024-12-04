import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { FilterService } from '../common_service/filter.service';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-user-event',
  templateUrl: './user-event.component.html',
  styleUrls: ['./user-event.component.css']
})
export class UserEventComponent implements OnInit {
 
  
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 9; 
  showeventdata: any[] = [];
  filteredEvent: any[] = [];
  selectedCategories: any; 
  p: number = 1;    
  term:any;
  searchTerm: string = ''; // New property for search term
  currentSortOption: string = '';


  constructor(private Dservice: DashboardService, private filter: FilterService, private http: HttpClient, private searchService: SearchService) { }

  ngOnInit(): void {
    
    this.loadEvents(this.currentPage, this.itemsPerPage);

    this.filter.selectedCategories$.subscribe(categories => {
      this.selectedCategories = categories;
      this.filterEvents(); // Re-filter on category selection
      
    });

    // Subscribe to search term changes
    this.searchService.currentSearchData.subscribe(term => {
      this.searchTerm = term;
      console.log('Received search term in UserEventComponent:', this.searchTerm);
      this.searchFilter();
      this.fetchEvents(); 
    });

    this.searchService.sortOption$.subscribe(option => {
      this.currentSortOption = option;
      console.log('Received Sort Option:', this.currentSortOption);
      this.filterEvents();
    });
  }

  loadEvents(page: number, limit: number):void{
    this.Dservice.Eventdata(page, limit).subscribe(Response => {
      console.log(Response);
      this.showeventdata = Response.data;
      this.filteredEvent = this.showeventdata;
      this.totalItems = Response.pagination.totalItems;
    });
  }


  searchFilter(): void{
    if (!this.searchTerm) {
      this.filteredEvent = this.showeventdata; // Reset to full event list
    } else {
      this.filteredEvent = this.showeventdata.filter(event =>
        event.event_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  filterEvents(): void {
    this.filteredEvent = this.showeventdata;

    if (this.selectedCategories && this.selectedCategories.length > 0) {
      this.Dservice.getEventdatacategory(this.currentPage, this.itemsPerPage, this.selectedCategories,this.currentSortOption)
        .subscribe(result => {
          console.log("filtered category wise Events", result);  
          this.filteredEvent = result.data.filter((event:any) =>
            this.selectedCategories.includes(event.event_category)
          );
          this.totalItems = result.pagination.totalItems;
        });
    }else if (this.currentSortOption) {

      this.Dservice.getEventdatacategory(this.currentPage, this.itemsPerPage,this.selectedCategories, this.currentSortOption)
      .subscribe(result => {
        console.log("Events with sort option only:", result);
        this.showeventdata = result.data;
        this.filteredEvent = this.showeventdata;
        this.totalItems = result.pagination.totalItems;
      });
    }
    else {
      console.log("No filter applied; showing default data.");
      this.filteredEvent = this.showeventdata; // Default to unfiltered data
      this.totalItems = this.showeventdata.length;
    }  
  }

   // Handle page change for pagination
   onPageChange(page: number): void {
    this.currentPage = page;
    this.loadEvents(this.currentPage, this.itemsPerPage); 
    this.p = page;
  }

  fetchEvents(): void {
    if (this.searchTerm) {
      this.http.get<any>(`https://rshvtu5ng8.execute-api.ap-south-1.amazonaws.com/api/search/events?event_name=${this.searchTerm}`)
        .subscribe(
          (response) => {
            this.showeventdata = response.data; 
            console.log('Fetched Events:', this.showeventdata); 
            this.filteredEvent = response.data;
            this.totalItems = response.pagination.totalItems;
          },
          (error) => {
            console.error('Error fetching events:', error);
          }
        );
    } else {
      this.loadEvents(this.currentPage,this.itemsPerPage);
    }
  }
  showeventName = false;
  truneventName(name: string): string {
   return name.length > 14 ? name.slice(0, 12) + '...' : name;
 }

}



