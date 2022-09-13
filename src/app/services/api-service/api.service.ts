import { Injectable } from '@angular/core';
import { Person } from '../../models/person';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiURL = 'https://62a070e5202ceef7086dfad6.mockapi.io/api/v1';
    constructor(private http: HttpClient) {}

    getPersons(): Observable<Person[]> {
        return this.http
            .get<Person[]>(this.apiURL + '/persons')
            .pipe(catchError(this.errorHandler));
    }

    errorHandler(error: {
        error: { message: string };
        status: any;
        message: any;
    }): Observable<never> {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }
}
