import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ViewStockService } from '../../../services/viewstock.service';

@Component({
  selector: 'app-viewstock',
  templateUrl: './viewstock.component.html',
  styleUrl: './viewstock.component.css'
})
export class ViewstockComponent implements OnInit {
  mobileData: any[] = [];

  constructor(private mobileService: ViewStockService,private router: Router) {}

  ngOnInit(): void {
    this.getMobileData();
    
  }

  getMobileData(): void {
    this.mobileService.getMobiles().subscribe(
      (data) => {
        this.mobileData = data.map(mobile => ({
          ...mobile,
          imageUrlPath: `http://localhost:5000${mobile.imageUrlPath}` 
        }));
      },
      (error) => console.error('Error fetching mobile data:', error)
    );
  }

  deleteMobile(Id: number) {
      Swal.fire({
        icon: 'success',
        title: 'Item Deleted',
        text: 'Item Deleted Successfully',
        timer: 3000,
        showConfirmButton: false, 
      });
      this.mobileData = this.mobileData.filter(m => m.mobileId !== Id);

      this.mobileService.removeMobile(Id).subscribe(
        () => 
        {
          console.log('delete')
        }
      );
    }

    updateMobile(Id:number)
    {
     
    }
}
