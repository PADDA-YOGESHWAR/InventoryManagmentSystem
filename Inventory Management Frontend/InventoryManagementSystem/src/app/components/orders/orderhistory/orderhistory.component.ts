import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../../../services/order.service';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrl: './orderhistory.component.css'
})
export class OrderhistoryComponent {
  orderData: any[] = [];

  constructor(private orderService: InventoryService,private router: Router) {}

  ngOnInit(): void {
    this.getOrderData();
    
  }

  getOrderData(): void {
    this.orderService.getOrders().subscribe(
      (data: any[]) => {
        this.orderData = data.map(order => ({
          ...order, 
        }));
      },
      (error: any) => console.error('Error fetching mobile data:', error)
    );
  }
}
