import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StockService } from '../../../services/uploadstock.service';


@Component({
  selector: 'app-addstock',
  templateUrl: './addstock.component.html',
  styleUrl: './addstock.component.css'
})
export class AddstockComponent implements OnInit {
  
  stockForm: FormGroup;
  imageError: string | null = null;
  successMessage: string = '';


  constructor(private fb: FormBuilder, private stockService: StockService,private router: Router) {
    this.stockForm = this.fb.group({
      phoneModelName: ['', [Validators.required, Validators.minLength(3)]],
      phoneBrandName: ['', [Validators.required]],
      phonePrice: ['', [Validators.required, Validators.min(1)]],
      phoneQuantity: ['', [Validators.required, Validators.min(1)]],
      phoneImage: [null]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.stockForm.valid) {
      const formData = new FormData();
      formData.append('mobileName', this.stockForm.get('phoneModelName')?.value);   
      formData.append('mobileBrand', this.stockForm.get('phoneBrandName')?.value);  
      formData.append('mobilePrice', this.stockForm.get('phonePrice')?.value);      
      formData.append('mobileCount', this.stockForm.get('phoneQuantity')?.value);
  
      const file = this.stockForm.get('phoneImage')?.value;
      if (file) {
        formData.append('media', file);  
      }
  
      this.stockService.uploadStock(formData).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Stock Added!',
            text: response.message,
            timer: 3000,
            showConfirmButton: false, // Hides the confirm button
          });
          console.log(response);
          this.successMessage = response.message;
          this.resetForm();
          this.router.navigate(['/stocks/all-stocks']);
        },
        (error) => {
          console.error('Error uploading stock:', error);
        }
      );      
    } else {
      console.log('Form is invalid');
    }
    
  }

  onImageSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        this.imageError = 'Only JPG, PNG, and JPEG files are allowed.';
        this.stockForm.patchValue({ phoneImage: null });
      } else {
        this.imageError = null;
        this.stockForm.patchValue({ phoneImage: file });
      }
    }
  }

  resetForm(): void {
    this.stockForm.reset();
    this.imageError = null;
  }
}



