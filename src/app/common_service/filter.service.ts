import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  private selectedCategoriesSubject = new BehaviorSubject<string[]>([]);
  selectedCategories$ = this.selectedCategoriesSubject.asObservable();

  updateSelectedCategories(categories: string[]) {
    this.selectedCategoriesSubject.next(categories);
  }

  filterDataByCategories(allData: any[], selectedCategories: string[]): any[] {
    if (!selectedCategories.length) {
      return allData; // If no categories are selected, return all data
    }
    return allData.filter(item => selectedCategories.includes(item.category_name)); // Filter data based on selected categories
  }

}
