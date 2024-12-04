import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

   
  private API_URL ="https://rshvtu5ng8.execute-api.ap-south-1.amazonaws.com/api";

  

  // private API_URL="http://localhost:1000"

 
constructor(private http:HttpClient) { }

          // getcategoryname():Observable<any>{
          //     let _AllCategory:any;
          //   if(localStorage.getItem("AllCategory")){
          //     _AllCategory = localStorage.getItem("AllCategory");
          //   } else {
          //     _AllCategory = this.http.get<any>(`${this.API_URL}/beforeLogin/allcategory`);
          //     localStorage.setItem("AllCategory",_AllCategory);              
          //   }
          //     return _AllCategory;
          // }

          getcategoryname(): Observable<any> {
            const cachedData = localStorage.getItem("AllCategory");
          
            if (cachedData) {
              return new Observable(observer => {
                observer.next(JSON.parse(cachedData));
                observer.complete();
              });
            } else {
              return this.http.get<any>(`${this.API_URL}/beforeLogin/allcategory`).pipe(
                tap((data: any) => {
                  localStorage.setItem("AllCategory", JSON.stringify(data));
                })
              );
            }
          }
          

          // getcategoryname():Observable<any>{
          //  return this.http.get<any>(`${this.API_URL}/beforeLogin/allcategory`);
          // }

          getcouserdata(page: number, limit: number):Observable<any>{
            return this.http.get<any>(`${this.API_URL}/beforeLogin/allcourses?page=${page}&limit=${limit}`)
          }

          getcouserdatacategory(page: number, limit: number, categories?: string, filterType?: string): Observable<any> {
            return this.http.get<any>(`${this.API_URL}/filter/courses?categories=${categories}&filterType=${filterType}&page=${page}&limit=${limit}`);
          }

          gethomedatauser(page: number, limit: number):Observable<any>{
            return this.http.get<any>(`${this.API_URL}/beforeLogin/home?page=${page}&limit=${limit}`)
          }

          getcouserdatabyID(id:any):Observable<any>{
            return this.http.get<any>(`${this.API_URL}/beforeLogin/course/${id}`)
          }

          gettrainerdata(page: number, limit: number):Observable<any>{
            return this.http.get<any>(`${this.API_URL}/beforeLogin/trainers?page=${page}&limit=${limit}`);
           }

           getTrainerdatacategory(page: number, limit: number, categories?: string): Observable<any> {
            return this.http.get<any>(`${this.API_URL}/trainers/filter?categories=${categories}&page=${page}&limit=${limit}`);
          }

           productdata(page: number, limit: number):Observable<any>{
            return this.http.get<any>(`${this.API_URL}/beforeLogin/allproduct?page=${page}&limit=${limit}`);
           }

           getproductdatacategory(page: number, limit: number, categories?: string, filterType?: string): Observable<any> {
            return this.http.get<any>(`${this.API_URL}/product/filter/product?categories=${categories}&filterType=${filterType}&page=${page}&limit=${limit}`);
          }

           productdatabyID(id:any):Observable<any>{
            return this.http.get<any>(`${this.API_URL}/beforeLogin/product/${id}`);
           }

           GetCourseReview(id:string,page: number, limit: number):Observable<any>{
            return this.http.get<any>(`${this.API_URL}/review/course/${id}?page=${page}&limit=${limit}`);
           }

           Eventdata(page: number, limit: number):Observable<any>{
            return this.http.get<any>(`${this.API_URL}/beforeLogin/allevents?page=${page}&limit=${limit}`);
           }

           getEventdatacategory(page: number, limit: number, categories?: string, filterType?: string): Observable<any> {
            return this.http.get<any>(`${this.API_URL}/event/filter/event?categories=${categories}&filterType=${filterType}&page=${page}&limit=${limit}`);
          }

           EventdatabyID(id:any):Observable<any>{
            return this.http.get<any>(`${this.API_URL}/beforeLogin/event/${id}`);
           }

           postreviewEvent(data:any):Observable<any>{
            return this.http.post<any>(`${this.API_URL}/review/event`,data)
          }

          GetEventReview(id:string,page: number, limit: number):Observable<any>{
            return this.http.get<any>(`${this.API_URL}/review/event/${id}?page=${page}&limit=${limit}`);
           }

           courseenroll(data:{course_id: any}): Observable<any> {
            return this.http.post<any>(`${this.API_URL}/enrollcourse`, data);
          }

          postreviewProduct(data:any):Observable<any>{
            return this.http.post<any>(`${this.API_URL}/review/product`,data)
          }

          GetProductReview(id:string,page: number, limit: number):Observable<any>{
            return this.http.get<any>(`${this.API_URL}/review/product/${id}?page=${page}&limit=${limit}`);
           }

          bookevent(data:{event_id: any}): Observable<any> {
            return this.http.post<any>(`${this.API_URL}/event/registerevent`, data);
          }

          SEOkeywords():Observable<any>{
            return this.http.get<any>(`${this.API_URL}/footer`);
          }

          search(query: string):Observable<any>{
            return this.http.get<any>(`${this.API_URL}/search/global?q=${query}`)
          }

          postEnquiry(data:any):Observable<any>{
            return this.http.post<any>(`${this.API_URL}/enquiries`,data)
          }

          postquestions(data:any):Observable<any>{
            return this.http.post<any>(`${this.API_URL}/questions`,data)
          }

          postreview(data:any):Observable<any>{
            return this.http.post<any>(`${this.API_URL}/review`,data)
          }

          postreviewCourse(data:any):Observable<any>{
            return this.http.post<any>(`${this.API_URL}/review/course`,data)
          }

          BookApnmt(data:any):Observable<any>{
            return this.http.post<any>(`${this.API_URL}/appointment`,data)
          }

          registerProduct(product: { product_id: string }): Observable<any> {
            return this.http.post(`${this.API_URL}/product/registerproduct`, product);
          }

          Addtocart(cart:{productId:any, quantity:any}):Observable<any>{
            return this.http.post<any>(`${this.API_URL}/cart/add`,cart)
          }

          getcartproduct():Observable<any>{
           return this.http.get<any>(`${this.API_URL}/cart`);
          }

          deletecartproductbyID(productId: string): Observable<any> {
            return this.http.delete(`${this.API_URL}/cart/remove/${productId}`);
          }

          getblogdata():Observable<any>{
            return this.http.get<any>(`${this.API_URL}/blog`)
          }
         
          blogdatabyID(id: string): Observable<any> {
            return this.http.get<any>(`${this.API_URL}/blog/${id}`);
          }

          getDashboardData(): Observable<any> {
            return this.http.get<any>(`${this.API_URL}/dashboard`);
          }

          getDashboardDataAdmin(): Observable<any> {
            return this.http.get<any>(`${this.API_URL}/admin/s/dashboard-counts`);
          }

          GetAllForum(): Observable<any>{
            return this.http.get<any>(`${this.API_URL}/forum`)          
          }

          GetForumGetByID(id:string):Observable<any>{
            return this.http.get<any>(`${this.API_URL}/forum/${id}`)
          }

          AddForum(Forum:any):Observable<any>{
            return this.http.post<any>(`${this.API_URL}/forum/add`,Forum)
          }

          AddForumAnswer(Forum:any):Observable<any>{
            return this.http.post<any>(`${this.API_URL}/forum/postanswer`,Forum)
          }

          
}

