import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { RelevanceComponent } from './relevance/relevance.component';
import { TrainerComponent } from './trainer/trainer.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeeallcategoriesComponent } from './seeallcategories/seeallcategories.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AdminDashboardCategoriesComponent } from './admin/admin-dashboard-categories/admin-dashboard-categories.component';

import { TrainerHomeComponent } from './trainer_dashboard/trainer-home/trainer-home.component';
import { CourseenrollComponent } from './courseenroll/courseenroll.component';
import { EnrollNowComponent } from './enroll-now/enroll-now.component';
import { EdittrainerComponent } from './edittrainer/edittrainer.component';
import { MyCourseComponent } from './trainer_dashboard/my-course/my-course.component';
import { QuestionComponent } from './trainer_dashboard/question/question.component';
import { AppointmentComponent } from './trainer_dashboard/appointment/appointment.component';
import { EventComponent } from './trainer_dashboard/event/event.component';
import { EnquiryComponent } from './trainer_dashboard/enquiry/enquiry.component';
import { ProductComponent } from './trainer_dashboard/product/product.component';
import { EditCourseComponent } from './trainer_dashboard/edit-course/edit-course.component';
import { EditCategoryComponent } from './Admin/edit-category/edit-category.component';
import { UpdateProductComponent } from './trainer_dashboard/update-product/update-product.component';
import { UpdateEventComponent } from './trainer_dashboard/update-event/update-event.component';
import { InterceptorService } from './Interceptor/interceptor.service';
import { TrainerMyhomeComponent } from './trainer_dashboard/trainer-myhome/trainer-myhome.component';
import { UsersideProductComponent } from './userside-product/userside-product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './footer/footer.component';
import { UserEventComponent } from './user-event/user-event.component';
import { UserEventDetailsComponent } from './user-event-details/user-event-details.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { SEOKeywordComponent } from './seo-keyword/seo-keyword.component';
import { CookieService } from 'ngx-cookie-service';
import { ReviewComponent } from './trainer_dashboard/review/review.component';
import {MatTabsModule} from '@angular/material/tabs';
import { NotificationComponent } from './notification/notification.component';
import { BlogDetailsComponent } from './blog/blog-details/blog-details.component';
import { BlogComponent } from './blog/blog/blog.component';
import { CourseNamePipe } from './Filter/course-name.pipe';
import { AboutComponent } from './about/about.component';
import { FAQComponent } from './faq/faq.component';
import { EditProfilePictureComponent } from './edit-profile-picture/edit-profile-picture.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LinkedinAuthCallbackComponent } from './linkedin-auth-callback/linkedin-auth-callback.component';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { ContactComponent } from './contact/contact.component';
import { ForumComponent } from './forum/forum.component';
import { ForumDetailsComponent } from './forum-details/forum-details.component';
import { NgxEditorModule } from "ngx-editor";
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ForumAddPageComponent } from './forum-add-page/forum-add-page.component';
import { TagInputModule } from 'ngx-chips';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { NgApexchartsModule } from "ng-apexcharts";
import { SpinnerComponent } from './Loader/spinner/spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    RelevanceComponent,
    TrainerComponent,
    ShopComponent,
    CartComponent,
    SignInComponent,
    SignUpComponent,
    CourseDetailsComponent,
    SeeallcategoriesComponent,
    GalleryComponent,
    AdminDashboardCategoriesComponent,
   
    TrainerHomeComponent,
    CourseenrollComponent,
    EnrollNowComponent,
    EdittrainerComponent,
    MyCourseComponent,
    QuestionComponent,
    AppointmentComponent,
    EventComponent,
    EnquiryComponent,
    ProductComponent,
    EditCourseComponent,
    EditCategoryComponent,
    UpdateProductComponent,
    UpdateEventComponent,
    
    TrainerMyhomeComponent,
   
    UsersideProductComponent,
    FooterComponent,
    UserEventComponent,
    UserEventDetailsComponent,
    SuperAdminComponent,
    SEOKeywordComponent,
    ReviewComponent,
    NotificationComponent,
    BlogDetailsComponent,
    BlogComponent,
    CourseNamePipe,
    AboutComponent,
    FAQComponent,
    EditProfilePictureComponent,
    PrivacyPolicyComponent,
    LinkedinAuthCallbackComponent,
    ContactComponent,
    ForumComponent,
    ForumDetailsComponent,
    BreadcrumbComponent,
    ForumAddPageComponent,
    ResetPasswordComponent,
    SpinnerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatTabsModule,
    OAuthModule.forRoot(),
    NgxEditorModule,
    TagInputModule,
    NgApexchartsModule,
    FontAwesomeModule 
    
   
  ],
  providers: [OAuthService,CookieService,{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
