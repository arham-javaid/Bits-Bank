import { Injectable, Inject } from '@angular/core';
import { Observable, lastValueFrom, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpConfig } from './http-config';
import { WrapHttpService } from './wrap-http.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  getTransactionsBySearchTerm(filter: { searchTerm: string; }) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = HttpConfig.mainApiUrl() + '/transactions'; 

  constructor(@Inject(WrapHttpService) private http: WrapHttpService) { }

  createTransaction(data: object): Promise<any> {
    return lastValueFrom(
      this.http.post(`${this.apiUrl}`, data).pipe(
        catchError((error) => {
          console.error('Error in createTransaction:', error);
          return of(null);
        })
      )
    );
  }

  getTransactions(filter?: object) {
    return lastValueFrom(this.http.get(this.apiUrl + WrapHttpService.objToQuery(filter)));
  }
  
  // getTransactions(conditions?: object): Promise<any> {
  //   return lastValueFrom(this.http.get(`${this.apiUrl}/transactions` + WrapHttpService.objToQuery(conditions)));
  // }

  // async getFilteredTransactions(filterValues: any): Promise<any[]> {
  //   try {
  //     const response = await lastValueFrom(
  //       this.http.post(`${this.apiUrl}/filter`, filterValues).pipe(
  //         catchError((error) => {
  //           console.error('Error applying filter:', error);
  //           return of([]); // Return an empty array in case of error
  //         })
  //       )
  //     );
  //     return response;
  //   } catch (error) {
  //     console.error('Error in getFilteredTransactions:', error);
  //     return []; // Return an empty array in case of exception
  //   }
  // }



  // getTransactionById(transactionId: string,): Observable<any> {
  //   const url = `${this.apiUrl}/${transactionId}`;
  //   return this.http.get(url);
  // }

  getTransactionById(transactionId: string) {
  return lastValueFrom(this.http.get(`${this.apiUrl}/${transactionId}`));
}


  updateTransaction(transactionId: string, transactionData: any): Promise<any> {
    const url = `${this.apiUrl}/${transactionId}`;
    return lastValueFrom(this.http.patch(url, transactionData).pipe(
      catchError((error) => {
        console.error('Error updating transaction:', error);
        return of(null);
      })
    ));
  }


  deleteTransaction(transactionId: string) {
    const url = `${this.apiUrl}/${transactionId}`;
    return lastValueFrom(this.http.delete(url));
  }
  
  getAllTransactions(date: string): Observable<number | null> {
    return this.http.get(`${this.apiUrl}?date=${date}`).pipe(
      catchError((error) => {
        console.error('Error fetching total amount:', error);
        return of(null);
      })
    );
  }


  getAllTransactionsByPhone(data: { phone: string }): Promise<any> {
    return this.http.post(`${this.apiUrl}/getByPhone`, data).toPromise();
  }
  

  getDateWiseTransactions(){
    const url = `${this.apiUrl}/date-wise`;
    return lastValueFrom(this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error fetching date-wise transactions:', error);
        return of(null);
      })
    ));
  }



}


