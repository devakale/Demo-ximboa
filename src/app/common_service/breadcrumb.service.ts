import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap , map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private APIURL = "https://rshvtu5ng8.execute-api.ap-south-1.amazonaws.com/api";

  // BehaviorSubject to manage breadcrumb data
  private breadcrumbsSubject = new BehaviorSubject<Array<{ label: string, url: string }>>([]);
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Fetch and update breadcrumb data based on parameters
  fetchBreadcrumbs(category: string, type: string, id: string): void {
    this.http.get<any>(`${this.APIURL}/search/getbreadcrumb?category=${category}&type=${type}&id=${id}`)
      .pipe(
        map(response => response.data || []),  // Extract data from the response
        tap(breadcrumbs => this.breadcrumbsSubject.next(breadcrumbs))  // Update breadcrumbs subject
      )
      .subscribe();
  }


  // private breadcrumbsSubject = new BehaviorSubject<Array<{ label: string, url: string }>>([]);
  // breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  // setBreadcrumbs(breadcrumbs: Array<{ label: string, url: string }>) {
  //   this.breadcrumbsSubject.next(breadcrumbs);
  // }
}
