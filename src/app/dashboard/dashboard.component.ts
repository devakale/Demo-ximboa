import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showAll: boolean = false;
  showCategorydata:any[]=[];
  Showcouserdata:any[]=[];
  showproductdata:any[]=[];
  showeventdata:any[]=[];
  ShowAllCategory:any[]=[];

  showtrainerData:any[]=[];
  selectedProduct: any;

  page = 0;
  limit = 4;



  showFullName = false;
  truncateBusinessName(name: string): string {
    return name.length > 18 ? name.slice(0, 15) + '...' : name;
  }

  showcourseName = false;
   truncatecourseName(name: string): string {
    return name.length > 18 ? name.slice(0, 10) + '...' : name;
  }
  showbusinessName = false;
  trunbusinessName(name: string): string {
   return name.length > 18 ? name.slice(0, 15) + '...' : name;
 }
 
 showeventName = false;
 truneventName(name: string): string {
  return name.length > 14 ? name.slice(0, 12) + '...' : name;
}

showproductName = false;
trunproductName(name: string): string {
 return name.length > 10 ? name.slice(0, 3) + '...' : name;
}



  showFullcategorytitle = false;
  truncatecategorytitle(name: string): string {
    return name.length > 40 ? name.slice(0, 35) + '...' : name;
  }

  visibleCategories() {
    return this.showAll ? this.showCategorydata : this.showCategorydata.slice(0, 9);
  }

  visibleCourses() {
    return this.showAll ? this.Showcouserdata : this.Showcouserdata.slice(0, 4);
  }

  visibleProduct() {
    return this.showAll ? this.showproductdata : this.showproductdata.slice(0, 4);
  }

  visibleEvent() {
    return this.showAll ? this.  showeventdata : this.  showeventdata.slice(0, 4);
  }

  showAlltrainer: boolean = false;
  toggleViewtainer() {
    this.showtrainerData || [];
    this.showAlltrainer = !this.showAlltrainer;
  }

  visibleTrainer(){
    return this.showAlltrainer ? this.showtrainerData : this.showtrainerData.slice(0, 6)
  }
  
   constructor(private Dservice:DashboardService){}

   ngOnInit(): void{
      this.Dservice.gethomedatauser(this.page, this.limit).subscribe( data =>{
        // console.log("All Data",data);
        this.showCategorydata = data.categoriesWithFullImageUrl;
        this.Showcouserdata = data.coursesWithFullImageUrl;
        this.showtrainerData=data.trainersWithFullImageUrl;
        this.showproductdata=data.productDetails;
        this.showeventdata = data.eventDetails;

      });

      this.Dservice.getcategoryname().subscribe(response =>{
        this.ShowAllCategory = response;
        this.ShowAllCategory.sort((a, b) => a.category_name.localeCompare(b.category_name));
      })

      // this.Dservice.gethomedatauser(this.page, this.limit).subscribe(result => {
      //   this.Showcouserdata = result.coursesWithFullImageUrl;
      // });

      // this.Dservice.gethomedatauser(this.page, this.limit).subscribe(data =>{
      //   this.showtrainerData=data.trainersWithFullImageUrl;
      // });

      // this.Dservice.gethomedatauser(this.page, this.limit).subscribe(data =>{
      //     this.showproductdata=data.productDetails;
      // });

      // this.Dservice.gethomedatauser(this.page, this.limit).subscribe(Response =>{
      //      this.showeventdata = Response.eventDetails;
      // })
   }


   ngAfterViewInit(): void {
    gsap.registerPlugin(MotionPathPlugin);
  
    const animateSVG = (lineId: string, arrowGroupId: string) => {
      // Set the arrow group transform origin to its center
      gsap.set(arrowGroupId, { transformOrigin: "50% 50%" });
  
      // Create the animation timeline
      const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  
      // Animate line drawing
      timeline.to(lineId, {
        duration: 4,
        strokeDashoffset: 0,
        ease: "none"
      });
  
      // Animate arrow movement along the line
      timeline.to(arrowGroupId, {
        duration: 4,
        motionPath: {
          path: lineId,
          align: lineId,
          autoRotate: true, // Enable auto rotation
          alignOrigin: [0.5, 0.5] // Center the rotation
        },
        ease: "none"
      }, 0);
    }
  
    // Animate each SVG separately
    animateSVG("#line-1", "#arrow-group-1");
    animateSVG("#line-2", "#arrow-group-2");
    animateSVG("#line-3", "#arrow-group-3");
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
  
  
  // product = {
  //   avgRating: 2  // example average rating
  // };

  starsArray: number[] = [1, 2, 3, 4, 5]; // 5 stars total


  //  ngAfterViewInit(): void {
  //   gsap.registerPlugin(MotionPathPlugin);

  //   // Set the arrow group transform origin to its center
  //   gsap.set("#arrow-group", { transformOrigin: "50% 50%" });
    

  //   // Create the animation timeline
  //   const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });

  //   // Animate line drawing
  //   timeline.to("#line", {
  //     duration: 4,
  //     strokeDashoffset: 0,
  //     ease: "none"
  //   });

  //   // Animate arrow movement along the line
  //   timeline.to("#arrow-group", {
  //     duration: 4,
  //     motionPath: {
  //       path: "#line",
  //       align: "#line",
  //       autoRotate: true, // Enable auto rotation
  //       alignOrigin: [0.5, 0.5] // Center the rotation
  //     },
  //     ease: "none"
  //   }, 0);
  // }
}
