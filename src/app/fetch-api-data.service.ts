import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


const apiUrl = 'https://fierce-fortress-37859-bd3c98eebee1.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  private apiUrl = 'https://fierce-fortress-37859-bd3c98eebee1.herokuapp.com/';

  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  userRegistration(userData: any): Observable<any> {
    return this.http.post<any>(apiUrl + 'users', userData).pipe(
      catchError(this.handleError)
    );
  }

  userLogin(userData: any): Observable<any> {
    return this.http.post<any>(apiUrl + 'login', userData).pipe(
      catchError(this.handleError)
    );
  }

  getOneMovie(title: any): Observable<any> {     
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${title}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  getDirector(Name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `directors/${Name}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  getGenre(Name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `genres/${Name}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Log the retrieved token
    const username = JSON.parse(localStorage.getItem('currentUser') || '{}').Username; // Retrieve username from localStorage
    console.log('Retrieved username:', username); // Log the retrieved username
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  

  updateUser(username: string, userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const url = apiUrl + `users/${username}`;
    
    console.log('Token:', token);
    console.log('Request URL:', url);
    
    return this.http.put(url, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json' // Specify content type as JSON
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  addFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const url = `${this.apiUrl}users/${username}/movies/${movieId}`;
    
    console.log('Token:', token);
    console.log('Request URL:', url);
    
    // Append token to headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Make POST request to add movie to favorites and return the observable
    return this.http.post(url, null, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    const url = `${this.apiUrl}users/${username}/favorite-movies`;
    return this.http.get(url, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  editUserProfile(username: any, userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + `users/${username}`, userData, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  deleteUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  removeFavoriteMovie(username: any, movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}/movies/${movieId}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  private extractResponseData(response: any): any {
    const body = response;
    return body || {};
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
