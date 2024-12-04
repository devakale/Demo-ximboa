import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { FilterService } from '../common_service/filter.service';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-userside-product',
  templateUrl: './userside-product.component.html',
  styleUrls: ['./userside-product.component.css'],
})
export class UsersideProductComponent implements OnInit {

  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 9; 
  showproductdata: any[] = []; // Ensure it's an array
  filteredProducts: any[] = [];
  selectedCategories: any; 
  p: number = 1;
  term:any;
  products: any[] = [];

  currentSortOption: string = '';

 
  starsArray: number[] = [1, 2, 3, 4, 5]; // 5 stars total
  searchTerm: string = ''; // New property for search term

  constructor(
    private service: DashboardService, 
    private filter: FilterService,
    private http: HttpClient, 
    private searchService: SearchService
  ) { }

  ngOnInit(): void {

    this.loadProducts(this.currentPage, this.itemsPerPage); // Load initial product data

    // Subscribe to category changes
    this.filter. selectedCategories$.subscribe(categories => {
      this.selectedCategories = categories;
      this.applyFilter(); // Re-filter when categories change
    });

    // Subscribe to search term changes
    this.searchService.currentSearchData.subscribe(term => {
      this.searchTerm = term;
      console.log('Received search term in UsersideProductComponent:', this.searchTerm);
        this.searchfilter();
        this.fetchProducts();
    });

    this.searchService.sortOption$.subscribe(option => {
      this.currentSortOption = option;
      console.log('Received Sort Option:', this.currentSortOption);
      this.applyFilter();
    });
    
  }

  loadProducts(page: number, limit: number): void {
    this.service.productdata(page, limit).subscribe(data => {
      this.showproductdata = data?.productsWithFullImageUrls; 
      this.filteredProducts = this.showproductdata;
      this.totalItems = data?.pagination.totalItems;
    });
  }

  searchfilter(): void{
    this.filteredProducts = this.showproductdata;

    if (this.searchTerm) {
      this.filteredProducts = this.filteredProducts.filter((product:any) =>
        product.products_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  applyFilter(): void {
    this.filteredProducts = this.showproductdata;

    if (this.selectedCategories && this.selectedCategories.length > 0) {
      this.service.getproductdatacategory(this.currentPage, this.itemsPerPage, this.selectedCategories,this.currentSortOption)
        .subscribe(result => {
          console.log("filtered category wise product", result);  
          this.filteredProducts = result.data.filter((product:any) =>
            this.selectedCategories.includes(product.products_category)
          );
          this.totalItems = result.pagination.totalItems;
        });
    }else if (this.currentSortOption){

      this.service.getproductdatacategory(this.currentPage, this.itemsPerPage,this.selectedCategories, this.currentSortOption)
      .subscribe(result => {
        console.log("Products with sort option only:", result);
        this.showproductdata = result.data;
        this.filteredProducts = this.showproductdata;
        this.totalItems = result.pagination.totalItems;
      });
 
   }
   else {
    console.log("No filter applied; showing default data.");
    this.filteredProducts = this.showproductdata; // Default to unfiltered data
    this.totalItems = this.showproductdata.length;
  }  
}

  //  Handle page change for pagination
  
   onPageChange(page: number): void {
    this.currentPage = page;
    this.p = page;
    this.loadProducts(this.currentPage, this.itemsPerPage); 
  }


  fetchProducts(): void {
    if (this.searchTerm) {      
      this.http.get<any>(`https://rshvtu5ng8.execute-api.ap-south-1.amazonaws.com/api/search/products?product_name=${this.searchTerm}`)
        .subscribe(
          response => {
            this.showproductdata = response.data; // Update showproductdata with search results
            console.log('Fetched Products:', this.showproductdata); // Log fetched data
            this.totalItems = response.pagination.totalItems;
          },
          error => {
            console.error('Error fetching products:', error);
          }
        );
    } else {
      this.loadProducts(this.currentPage, this.itemsPerPage); // Reload the product data if search term is empty
    }
  }

// conver Rupees K or laks
  getFormattedPrice(price: number): string {
    if (price >= 100000) {
      return '₹' + (price / 100000).toFixed(1) + 'L';  // For lakhs
    } else if (price >= 1000) {
      return '₹' + (price / 1000).toFixed(1) + 'K';  // For thousands
    } else {
      return '₹' + price.toString();  // For rupees
    }
  }


  showproductName = false;
  trunproductName(name: string): string {
    return name.length > 10 ? name.slice(0, 12) + '...' : name;
  }

  
 
}




