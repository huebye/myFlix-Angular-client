import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://gamingmovies.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

 // REGISTER
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

// LOGIN
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

// GET MOVIES
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
      }).pipe(
      catchError(this.handleError)
    );
  }

// GET ONE MOVIE
   getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
      }).pipe(
      catchError(this.handleError)
    );
  }

// GET DIRECTOR
   getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
      }).pipe(
      catchError(this.handleError)
    );
  }

// GET GENRE
   getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
      }).pipe(
      catchError(this.handleError)
    );
  }

// ADD MOVIE TO FAVORITE LIST 
   addFavoriteMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .post(apiUrl + 'users/:Name/Movies/:MovieID', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      }).pipe(
        catchError(this.handleError)
      );
  }  

// GET USERS  
   getUser(): Observable<any> {
     const token = localStorage.getItem('token');
     return this.http.get(apiUrl + 'users:Name', {
       headers: new HttpHeaders({
         Authorization: 'Bearer' + token,
       })
     })
     .pipe(
      catchError(this.handleError)
    );
   }

// EDIT USER 
   editUser(userDetails: any): Observable<any> {
   const token = localStorage.getItem('token');
   return this.http
     .put(apiUrl + 'users/:Name', userDetails, {
       headers: new HttpHeaders({
         Authorization: 'Bearer ' + token,
       })
     }).pipe(
      catchError(this.handleError)
    );
  }

// DELETE USER
   deleteUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + 'users/:Name', userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      }).pipe(
        catchError(this.handleError)
      );
   }

// Non-typed response extraction
    extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  } 
  
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}