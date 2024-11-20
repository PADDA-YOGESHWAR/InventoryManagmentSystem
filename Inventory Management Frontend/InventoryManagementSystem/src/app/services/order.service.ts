import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private apiUrl = 'http://localhost:5000/api/inventory'; 

  constructor(private http: HttpClient) {}

  getMobileInventory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetAllStock`);
  }

  placeOrder(cart: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/placeOrder`,  cart,{ responseType: 'text' as 'json' } );
  }
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders`);
  }
}
