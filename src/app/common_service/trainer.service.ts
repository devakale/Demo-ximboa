import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

 private  Trainer_APIURL ="https://rshvtu5ng8.execute-api.ap-south-1.amazonaws.com/api/trainerbyid";

  private APIURL = "https://rshvtu5ng8.execute-api.ap-south-1.amazonaws.com/api";
  private apiUrl = 'https://rshvtu5ng8.execute-api.ap-south-1.amazonaws.com/api/event/get/my-registered-events';


  constructor(private http:HttpClient) { }

  // *************** Trainer Profile API *****************
      gettrainerbyID():Observable<any>{
        return this.http.get<any>(`${this.APIURL}/registration/trainer`);
      }


      updatetrainerDetails(formData:FormData):Observable<any>{
        return this.http.put<any>(`${this.APIURL}/registration/update`,formData)
      }

      postSocialLinks(formData:any):Observable<any>{
        return this.http.post<any>(`${this.APIURL}/socialMedia`,formData)
      }

      postEducation(formData:any):Observable<any>{
        return this.http.post<any>(`${this.APIURL}/education`,formData)
      }

      postabout(formData:any):Observable<any>{
        return this.http.post<any>(`${this.APIURL}/about`,formData)
      }

      postskills(formData:any):Observable<any>{
        return this.http.post<any>(`${this.APIURL}/registration/addskills`,formData)
      }

      posttestimonial(formData:any):Observable<any>{
        return this.http.post<any>(`${this.APIURL}/testmonial`,formData)
      }

      postgallary(formData:FormData):Observable<any>{
        return this.http.post<any>(`${this.APIURL}/gallary`,formData)
      }

  // *************** Course API *****************

      gettrainerdatabyID():Observable<any>{
        let headers = new HttpHeaders()
        .set("Authorization", `Bearer ${sessionStorage.getItem('Authorization')}`)
        return this.http.get<any>(`${this.APIURL}/trainers`,{headers});
      }

      getAllCourseRequest():Observable<any>{
        return this.http.get<any>(`${this.APIURL}/admin/course/requests`)
      }

      ViewRequestCoursebyID(id:string):Observable<any>{
        return this.http.get<any>(`${this.APIURL}/course/${id}`)
      }

      CourserequestchangeStatus(courseId:string,status:string):Observable<any>{
        const body = { courseId, status };
        return this.http.put<any>(`${this.APIURL}/admin/course/requests`,{courseId, status})
      }

      deleteCoursebyID(_id: string): Observable<any> {
        return this.http.delete(`${this.APIURL}/course/${_id}`);
      }

      updateCorseByID(CID: any, CDATA:FormData):Observable<any>{
        return this.http.put<any>(`${this.APIURL}/course/${CID}`,CDATA);
      }


  // *************** Event API *****************
      geteventdata():Observable<any>{
        return this.http.get<any>(`${this.APIURL}/trainers`)
      }

      AddEvent(eventData: FormData): Observable<any> {
        return this.http.post<any>(`${this.APIURL}/event`, eventData);
      }

      getAllEventsRequest():Observable<any>{
        return this.http.get<any>(`${this.APIURL}/admin/events/requests`)
      }

      ViewRequestEventsbyID(id:string):Observable<any>{
        return this.http.get<any>(`${this.APIURL}/event/${id}`)
      }

      EventsrequestchangeStatus(eventId:string,status:string):Observable<any>{
        const body = { eventId, status };
        return this.http.put<any>(`${this.APIURL}/admin/events/requests`,{eventId, status})
      }

      deleteEvent(_id:any):Observable<any>{
        return this.http.delete<any>(`${this.APIURL}/event/${_id}`)
      }

      geteventbyID(_id:any):Observable<any>{
        return this.http.get<any>(`${this.APIURL}/event/${_id}`);
      }

      UpdateEventbyID(_id : string, formData:any):Observable<any>{
        return this.http.put<any>(`${this.APIURL}/event/${_id}`,formData)
      }

      getRegisteredEvents(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
      }

  // *************** Product API *****************

      addProduct(productData: FormData): Observable<any> {
        return this.http.post(`${this.APIURL}/product`, productData);
      }

      getAllProductRequest():Observable<any>{
        return this.http.get<any>(`${this.APIURL}/admin/product/requests`)
      }

      ViewRequestProductbyID(id:string):Observable<any>{
        return this.http.get<any>(`${this.APIURL}/product/${id}`)
      }

      ProductrequestchangeStatus(productId:string,status:string):Observable<any>{
        const body = { productId, status };
        return this.http.put<any>(`${this.APIURL}/admin/product/requests`,{productId, status})
      }

      deleteproductBYID(_id: string):Observable<any>{
        return this.http.delete<any>(`${this.APIURL}/product/${_id}`);
      }

      getproductById(_id:string):Observable<any>{
        return this.http.get<any>(`${this.APIURL}/product/${_id}`);
      }

      updateproductbyID(_id : string, formData:FormData ):Observable<any>{
        return this.http.put<any>(`${this.APIURL}/product/${_id}`,formData)
      }

      getproductdatabyID():Observable<any>{
        return this.http.get<any>(`${this.APIURL}/product/get/my-registered-product`);
      }

  // *************** Enquiry API *****************

      deleteEnquiryBYID(_id: string):Observable<any>{
        return this.http.delete<any>(`${this.APIURL}/enquiries/${_id}`)
      }    

      GetEnquiry(page: number, limit: number):Observable<any>{
        return this.http.get<any>(`${this.APIURL}/enquiries/trainer?page=${page}&limit=${limit}`);
       }

  // *************** Appointment *****************

    deleteAppointmentbyID(_id: string):Observable<any>{
        return this.http.delete<any>(`${this.APIURL}/appointment/${_id}`);
      }

   // Function to approve an appointment
  
   approveAppointment(id: string): Observable<any> {
    return this.http.put<any>(`${this.APIURL}/appointment/${id}/approve`, {});
  }

  // Function to reject an appointment
  
    rejectAppointment(id: string, rejectionReason: string): Observable<any> {
      return this.http.put<any>(`${this.APIURL}/appointment/${id}/reject`,{ rejectionReason: rejectionReason });
    }

  
  // *************** Appointment *****************

      deletequestionbyID(_id: string):Observable<any>{
        return this.http.delete<any>(`${this.APIURL}/${_id}`);
      }



  // ****************** Trainer Profile *********************   

      getprofile(id:string):Observable<any>{
        return this.http.get<any>(`${this.APIURL}/trainerbyid/${id}`);
      }

      GetAllCoursesonprofilepage(id:string,page: number, limit: number):Observable<any>{
        return this.http.get<any>(`${this.APIURL}/trainer/courses/${id}?page=${page}&limit=${limit}`)
      }

      GetAllEventsonprofilepage(id:string,page: number, limit: number):Observable<any>{
        return this.http.get<any>(`${this.APIURL}/event/bytrainer/${id}?page=${page}&limit=${limit}`)
      }

      GetAllProductonprofilepage(id:string,page: number, limit: number):Observable<any>{
        return this.http.get<any>(`${this.APIURL}/product/bytrainer/${id}?page=${page}&limit=${limit}`)
      }

      GetAppointment(page: number, limit: number):Observable<any>{
        return this.http.get<any>(`${this.APIURL}/appointment/trainer?page=${page}&limit=${limit}`);
       }


      //  ****************** 	Question ********************* 
      
      GetQuestion(page: number, limit: number):Observable<any>{
        return this.http.get<any>(`${this.APIURL}/questions/trainer?page=${page}&limit=${limit}`);
       }
      
       deleteQuestionBYID(_id: string):Observable<any>{
        return this.http.delete<any>(`${this.APIURL}/questions/${_id}`)
      }  


}
