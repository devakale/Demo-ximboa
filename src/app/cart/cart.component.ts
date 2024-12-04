import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  

  showcartdata: any;
  totalprice: number = 0;

  constructor(private service: DashboardService,private route:Router) { }

  ngOnInit(): void {
    this.service.getcartproduct().subscribe(data => {
      console.log(data);
      this.showcartdata = data.items;
      this.totalprice = data.totalPrice;
    });
  }

  increment(index: number) {
    this.showcartdata[index].quantity++;
    this.updateTotalPrice(index);
  }

  decrement(index: number) {
    if (this.showcartdata[index].quantity > 1) {
      this.showcartdata[index].quantity--;
      this.updateTotalPrice(index);
    }
  }

  // Function to update the total price for the specific product
  updateTotalPrice(index: number) {
    const product = this.showcartdata[index];
    product.productTotalPrice = product.productPrice * product.quantity;

    // Optionally, you can also update the overall cart total price here
    this.totalprice = this.showcartdata.reduce((acc: number, item: any) => acc + item.productTotalPrice, 0);
  }

  // deletecartproduct(productId: string): void {
  //   this.service.deletecartproductbyID(productId).subscribe(
  //     response => {
  //       // alert("Product Removed successfully");
  //       Swal.fire({
  //         title: 'Are you sure?',
  //         text: 'You won’t be able to revert this!',
  //         icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonText: 'Yes, delete it!',
  //         cancelButtonText: 'No, keep it'
  //       }).then((result: SweetAlertResult) => {
  //         if (result.isConfirmed) {
  //           // Perform delete operation here
  //           Swal.fire('Success', 'Your item was deleted successfully.', 'success');
  //         } else if (result.isDismissed) {
  //           // Handle cancellation if needed
  //           Swal.fire('Cancelled', 'Your item is safe.', 'info');
  //         }
  //       });
  //       // window.location.reload();
  //     },
  //     error => {
  //       alert("Error");
  //     }
  //   );
  // }

  deletecartproduct(productId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        this.service.deletecartproductbyID(productId).subscribe(
          response => {
            Swal.fire('Success', 'Your item was deleted successfully.', 'success');
            this.service.getcartproduct().subscribe(data => {
              console.log(data);
              this.showcartdata = data.items;
              this.totalprice = data.totalPrice;
            });
          },
          error => {
            Swal.fire('Error', 'There was a problem deleting the item.', 'error');
          }
        );
      } else if (result.isDismissed) {
        Swal.fire('Cancelled', 'Your item is safe.', 'info');
      }
    });
  }

  
  
}
