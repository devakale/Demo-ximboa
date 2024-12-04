import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RelevanceComponent } from './relevance/relevance.component';
import { TrainerComponent } from './trainer/trainer.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { SeeallcategoriesComponent } from './seeallcategories/seeallcategories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShopComponent } from './shop/shop.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AdminDashboardCategoriesComponent } from './admin/admin-dashboard-categories/admin-dashboard-categories.component';
import { EnrollNowComponent } from './enroll-now/enroll-now.component';
import { CourseenrollComponent } from './courseenroll/courseenroll.component';
import { TrainerHomeComponent } from './trainer_dashboard/trainer-home/trainer-home.component';
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
import { TrainerMyhomeComponent } from './trainer_dashboard/trainer-myhome/trainer-myhome.component';
import { CartComponent } from './cart/cart.component';
import { UsersideProductComponent } from './userside-product/userside-product.component';
import { UserEventComponent } from './user-event/user-event.component';
import { UserEventDetailsComponent } from './user-event-details/user-event-details.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { ReviewComponent } from './trainer_dashboard/review/review.component';
import { NotificationComponent } from './notification/notification.component';
import { BlogDetailsComponent } from './blog/blog-details/blog-details.component';
import { BlogComponent } from './blog/blog/blog.component';
import { AboutComponent } from './about/about.component';
import { FAQComponent } from './faq/faq.component';
import { EditProfilePictureComponent } from './edit-profile-picture/edit-profile-picture.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LinkedinAuthCallbackComponent } from './linkedin-auth-callback/linkedin-auth-callback.component';
import { ContactComponent } from './contact/contact.component';
import { ForumComponent } from './forum/forum.component';
import { ForumDetailsComponent } from './forum-details/forum-details.component';
import { ForumAddPageComponent } from './forum-add-page/forum-add-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { authGuard } from './AuthGuard/auth.guard';

const routes: Routes = [

  { path: "signin", component: SignInComponent },
  { path: "signup", component: SignUpComponent },
  { path: "auth/linkedin", component: LinkedinAuthCallbackComponent },

  // Routing For Super Admin Dashboard
  // { path: "superadmin", component: SuperAdminComponent },
  { path: "reset-password",component:ResetPasswordComponent},
  // { path: "editcategory/:_id", component: EditCategoryComponent },
  { path: "editcategory/:_id",component:EditCategoryComponent , canActivate: [authGuard]},
  { path: "Notification", component: NotificationComponent, canActivate: [authGuard]},
  { path: "editprofilepicture", component: EditProfilePictureComponent , canActivate: [authGuard] },

  //  Routing For Trainer Dashboard
  {
    path: "dashboard", component: TrainerHomeComponent, canActivate: [authGuard],
    children: [
      { path: "", component: TrainerMyhomeComponent, canActivate: [authGuard]},
      { path: "superadmin", component: SuperAdminComponent, canActivate: [authGuard]},
      { path: "admincategory", component: AdminDashboardCategoriesComponent ,canActivate: [authGuard], data: { role: 'SUPER_ADMIN' }},
      { path: "mycourse", component: MyCourseComponent,canActivate: [authGuard] },
      { path: "product", component: ProductComponent,canActivate: [authGuard] },
      { path: "question", component: QuestionComponent, canActivate: [authGuard] },
      { path: "appointment", component: AppointmentComponent , canActivate: [authGuard] },
      { path: "event", component: EventComponent , canActivate: [authGuard] },
      { path: "enquiry", component: EnquiryComponent , canActivate: [authGuard]},
      { path: "review", component: ReviewComponent , canActivate: [authGuard] },
    ] },
    
  { path: "edittrainer", component: EdittrainerComponent , canActivate: [authGuard] },
  { path: "editcourse/:_id", component: EditCourseComponent , canActivate: [authGuard] },
  { path: "editproduct/:_id", component: UpdateProductComponent , canActivate: [authGuard] },
  { path: "editevent/:_id", component: UpdateEventComponent , canActivate: [authGuard] },


  //  Routing For User Dashboard
  { path: "", component: DashboardComponent },
  { path: "Home", component: DashboardComponent},
  { path: "coursedetails/:id", component: CourseDetailsComponent },
  { path: "productdetails/:id", component: ShopComponent ,data: { breadcrumb: 'Product Details' }},
  { path: "eventdetails/:id", component: UserEventDetailsComponent,data: { breadcrumb: 'Events Details' } },
  { path: "cart", component: CartComponent },
  { path: "gallery", component: GalleryComponent },
  {
    path: "relevance", component: RelevanceComponent, data: { breadcrumb: 'Relevance' },
    children: [
      // {path:"",component:RelevanceDataComponent},
      { path: "", component: SeeallcategoriesComponent },
      { path: "Allcourses", component: SeeallcategoriesComponent,data: { breadcrumb: 'All Courses' } },
      { path: "alltrainer", component: TrainerComponent ,data: { breadcrumb: 'All Trainer' } },
      { path: "allproducts", component: UsersideProductComponent ,data: { breadcrumb: 'All Product' } },
      { path: "allevents", component: UserEventComponent ,data: { breadcrumb: 'All Events' } },
    ]
  },

  { path: "couserenroll/:id", component: CourseenrollComponent ,data: { breadcrumb: 'Course Details' } },
  { path: "enrollNow", component: EnrollNowComponent },

  // blog     
  { path: "blog", component: BlogComponent },
  { path: "blogdetails/:id", component: BlogDetailsComponent },
  { path: "about", component: AboutComponent },
  { path: "faq", component: FAQComponent },
  { path: "privacy-policy", component: PrivacyPolicyComponent },
  { path: "Contact", component:ContactComponent},
  { path: "forum",component:ForumComponent},
  { path: "forum-details/:id",component:ForumDetailsComponent},
  { path: "Add-Forum",component:ForumAddPageComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
