import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { InventoryService } from '../../../services/order.service';

@Component({
  selector: 'app-orderslanding',
  templateUrl: './orderslanding.component.html',
  styleUrls: ['./orderslanding.component.css']
})
export class OrderslandingComponent implements OnInit {
  mobileData: any[] = []; 
  cart: any[] = []; 
  errorMessage: string = ''; 
  totalprice: number=0;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.fetchMobileData(); 
  }

  // Fetch mobile data from the service
  fetchMobileData(): void {
    this.inventoryService.getMobileInventory().subscribe(
      (data) => {
        this.mobileData = data.map(mobile => ({
          ...mobile,
          imageUrlPath: `http://localhost:5000${mobile.imageUrlPath}` // Adjust URL here
        }));
      },
      (error) => {
        console.error('Error fetching mobile inventory:', error);
        this.errorMessage = 'Error fetching mobile inventory. Please try again later.';
      }
    );
  }

  // Add item to the cart
  addToCart(mobile: any): void {
    if (mobile.mobileCount > 0) {
      mobile.mobileCount -= 1;
      this.totalprice +=mobile.mobilePrice;
      const existingItem = this.cart.find(item => item.mobileId === mobile.mobileId);
      if (existingItem) {
        existingItem.quantity += 1; 
      } else {
        this.cart.push({ ...mobile, quantity: 1 }); 
      }
    }
  }

  // Place the order with cart data
  placeOrder(): void {
    if (this.cart.length > 0) {
      const orderData = this.cart.map(item => ({
        mobileId: item.mobileId,
        quantity: item.quantity
      }));

      this.inventoryService.placeOrder(orderData).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Order Placed',
            text: 'Order placed successfully!'
          });
          console.log('Order placed successfully:', response);
          this.cart = []; 
          this.errorMessage = ''; 
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Order Failed',
            text: this.errorMessage
          });
          console.error('Error placing order:', error);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Order Failed',
        text: this.errorMessage
      });

      this.errorMessage = 'Cart is empty. Please add items to the cart before placing an order.';
    }
  }
}
