  import { Injectable } from '@angular/core';
  import { catchError, map } from 'rxjs/operators';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';

  const apiUrl = 'https://fierce-fortress-37859-bd3c98eebee1.herokuapp.com/';

  @Injectable({
    providedIn: 'root'
  })
  export class FetchApiDataService {

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

    getUser(username: any): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + `users/${username}`, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
      );
    }

    updateUser(username: string, userData: any): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.put(apiUrl + `users/${username}`, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json' // Specify content type as JSON
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

    getFavoriteMovies(username: any): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + `users/${username}/movies`, {headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })}).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
      );
    }

    addFavoriteMovie(username: any, movieId: any): Observable<any> {
      const token = localStorage.getItem('token');
      const url = `${apiUrl}users/${username}/movies/${movieId}`;
      return this.http.post(url, null, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      }).pipe(
        map((response: any) => response), // Adjust according to your response structure
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
      console.error('An error occurred:', error); // Log error to console
      return throwError(error); // Rethrow the error to be caught by the subscriber
    }
  }
