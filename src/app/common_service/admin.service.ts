import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private APIURL = "https://rshvtu5ng8.execute-api.ap-south-1.amazonaws.com/api/trainer";

  private CategoryURL = "https://rshvtu5ng8.execute-api.ap-south-1.amazonaws.com/api";

  private dashboard = "https://rshvtu5ng8.execute-api.ap-south-1.amazonaws.com/api/beforeLogin/allcategory"

  private Cousers_API = "https://rshvtu5ng8.execute-api.ap-south-1.amazonaws.com/api/course";

  private trainer_API = "https://rshvtu5ng8.execute-api.ap-south-1.amazonaws.com/api/registration";





  constructor(private http: HttpClient) { }

  // ******************** Category API ***********************

  postCategory(name: string, sub_title: string, image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('category_name', name);
    formData.append('category_image', image);
    formData.append('sub_title', sub_title);
    return this.http.post(`${this.CategoryURL}/category`, formData);
  }

  AddSubCategory(category_id: string, sub_category_name: string): Observable<any> {
    const payload = {
      category_id: category_id,
      sub_category_name: sub_category_name
    };
    return this.http.post(`${this.CategoryURL}/category/sub-category`, payload);
  }

  getsubcategorybyCategoryID(categoryID:string):Observable<any>{
    return this.http.get<any>(`${this.CategoryURL}/category/${categoryID}/sub-categories`)
  }

  SubCategoryUpdate(id: string, sub_category_name: string, category_id: string): Observable<any> {
    return this.http.put<any>(`${this.CategoryURL}/category/${id}/update-sub-categories`, 
      {sub_category_name: sub_category_name,category_id: category_id});
  }
  

  // getcategorydata(): Observable<any> {
  //   return this.http.get<any>(this.dashboard);
  // }

  // getcategorydatadashboard(): Observable<any> {
  //   return this.http.get<any>(this.dashboard);
  // }

  deletecategorybyID(_id: string): Observable<any> {
    const url = `${this.CategoryURL}/category/${_id}`;
    return this.http.delete(url);
  }

  getCategoryById(id: string): Observable<any> {
    return this.http.get(`${this.CategoryURL}/category/${id}`);
  }

  updateData(id: string, updatedData: FormData): Observable<any> {
    return this.http.put(`${this.CategoryURL}/category/update/${id}`, updatedData);
  }



  // Category API Code End here

  // ******************** Courses API ***********************

  postcoursesdata(courseData: FormData): Observable<any> {
    return this.http.post(this.Cousers_API, courseData);
  }

  getcoursedata(): Observable<any> {
    return this.http.get(this.Cousers_API);
  }

  deletCoursebyID(_id: string): Observable<any> {
    const url = `${this.Cousers_API}/${_id}`;
    return this.http.delete(url);
  }

  getCourseById(id: string): Observable<any> {
    return this.http.get(`${this.Cousers_API}/${id}`);
  }

  updateCorseByID(id: any, cdata: FormData): Observable<any> {
    return this.http.put<any>(`${this.Cousers_API}/${id}`, cdata);
  }

  gettrainerdata(): Observable<any> {
    return this.http.get<any>(this.trainer_API);
  }
}
