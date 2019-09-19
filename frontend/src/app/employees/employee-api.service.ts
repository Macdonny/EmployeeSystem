import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL } from '../env';
import { Employee } from './employee.model';

@Injectable()
export class EmployeeAPIService {
  constructor(private http: HttpClient) {

  }

  private static _handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  /** GET: Recieve a list of all employees */
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${API_URL}/getAllEmployees`)
    .pipe(
      catchError(EmployeeAPIService._handleError)
    );
  }

  /** POST: Add a new employee to the database */
  addEmployee (employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${API_URL}/addEmployee`, employee)
      .pipe(
        catchError(EmployeeAPIService._handleError)
      );
  }

  /** PUT: Edit an existing employee from the database */
  editEmployee (employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${API_URL}/editEmployee`, employee)
      .pipe(
        catchError(EmployeeAPIService._handleError)
      );
  }
}
