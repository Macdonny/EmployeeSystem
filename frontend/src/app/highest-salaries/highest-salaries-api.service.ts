import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL } from '../env';
import { HighestSalaries } from './highest-salaries.model';

@Injectable()
export class HighestSalariesAPIService {
  constructor(private http: HttpClient) {

  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // Get list of top 3 highest avg salary of companies
  getHighestAvgSalaries(): Observable<HighestSalaries[]> {
    return this.http.get<HighestSalaries[]>(`${API_URL}/getHighestSalaries`)
    .pipe(
      catchError(HighestSalariesAPIService._handleError)
    );
  }
}
