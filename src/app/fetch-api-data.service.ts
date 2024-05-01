import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const apiUrl = 'https://fierce-fortress-37859-bd3c98eebee1.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map((response: any) => this.extractResponseData(response)),
      catchError((error: any) => this.handleError(error))
    );
  }

  userRegistration(userData: any): Observable<any> {
    return this.http.post<any>(apiUrl + 'users', userData).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }

  userLogin(userData: any): Observable<any> {
    return this.http.post<any>(apiUrl + 'login', userData).pipe(
      catchError((error: any) => this.handleError(error))
    );
  }

getMovie(title: any): Observable<any> {     
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + `movies/${title}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map((response: any) => this.extractResponseData(response)),
    catchError((error: any) => this.handleError(error))
  );

  getDirector(Name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `directors/${Name}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map((response: any) => this.extractResponseData(response)),
      catchError((error: any) => this.handleError(error))
    );
  }

  getGenre(Name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `genres/${Name}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map((response: any) => this.extractResponseData(response)),
      catchError((error: any) => this.handleError(error))
    );
  }

  getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map((response: any) => this.extractResponseData(response)),
      catchError((error: any) => this.handleError(error))
    );
  }

getFavoriteMovies(username: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + `users/${username}/movies`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map((response: any) => this.extractResponseData(response)),
    catchError((error: any) => this.handleError(error))
  );

  addFavoriteMovie(username: any, movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + `users/${username}/movies/${movieId}`, movieId, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map((response: any) => this.extractResponseData(response)),
      catchError((error: any) => this.handleError(error))
    );
  }

  editUser(username: any, userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + `users/${username}`, userData, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map((response: any) => this.extractResponseData(response)),
      catchError((error: any) => this.handleError(error))
    );
  }

  deleteUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map((response: any) => this.extractResponseData(response)),
      catchError((error: any) => this.handleError(error))
    );
  }

  deleteFavoriteMovie(username: any, movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}/movies/${movieId}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map((response: any) => this.extractResponseData(response)),
      catchError((error: any) => this.handleError(error))
    );
  }

  private extractResponseData(response: any): any {
    const body = response;
    return body || { };
  }

  private handleError(error: any): Observable<any> {
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
