import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:5000/api/inventory';

  constructor(private http: HttpClient) { }
  
  uploadStock(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/UploadStock`, data, {
      reportProgress: true,
      observe: 'response',
      responseType: 'json'
    })
    .pipe(
      map(response => {

        console.log('Response:', response);
        return response.body;  
      }),
      catchError((error) => {
        console.error('Error uploading stock', error);
        console.error('Error status:', error.status);
        console.error('Error response body:', error.error);
        return throwError(error);
      })
    );
  }
}
