import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/** 
 * Defines the base URL for API requests.
 */
const apiUrl = 'https://fierce-fortress-37859-bd3c98eebee1.herokuapp.com/';

/**
 * Injectable decorator marks this service as eligible for dependency injection.
 */
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  private apiUrl = 'https://fierce-fortress-37859-bd3c98eebee1.herokuapp.com/';

  /**
   * Constructor for FetchApiDataService class.
   * @param http - The HTTP client service for making HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Retrieves all movies from the API.
   * @returns An observable with the list of movies.
   */
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

  /**
   * Registers a new user.
   * @param userData - The user data to be registered.
   * @returns An observable with the user data.
   */
  userRegistration(userData: any): Observable<any> {
    return this.http.post<any>(apiUrl + 'users', userData).pipe(
      catchError(this.handleError)
    );
  }

   /**
   * Logs in an existing user.
   * @param userData - The user data for login.
   * @returns An observable with the user data.
   */
  userLogin(userData: any): Observable<any> {
    return this.http.post<any>(apiUrl + 'login', userData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves details of a specific movie.
   * @param title - The title of the movie to retrieve.
   * @returns An observable with the movie details.
   */
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

  /**
   * Retrieves details of a movie's director.
   * @param director - The name of a director to retrieve.
   * @returns An observable with director details.
   */
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

  /**
   * Retrieves details of a movie's genre.
   * @param genre - The name of a genre to retrieve.
   * @returns An observable with genre details.
   */
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

   /**
   * Retrieves details of a user's profile.
   * @param UserProfile - The name of a user to retrieve.
   * @returns An observable with user details.
   */
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

/**
   * Updates user profile.
   * @param username - The username of the user to be updated.
   * @param userData - The updated user data.
   * @returns An observable with the updated user data.
   */
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
  
  /**
 * Adds a movie to the user's list of favorite movies.
 * @param username - The username of the user.
 * @param movieId - The ID of the movie to be added to favorites.
 * @returns An observable with the response data.
 */
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
  
  /**
 * Retrieves the list of favorite movies for a user.
 * @param username - The username of the user.
 * @returns An observable with the list of the user's favorite movies.
 */
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
  
  /**
 * Edits the profile of a user.
 * @param username - The username of the user to be edited.
 * @param userData - The updated user data.
 * @returns An observable with the updated user data.
 */
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

  /**
 * Deletes a user.
 * @param username - The username of the user to be deleted.
 * @returns An observable with the response data.
 */
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

 /**
 * Removes a movie from the user's list of favorite movies.
 * @param username - The username of the user.
 * @param movieId - The ID of the movie to be removed from favorites.
 * @returns An observable with the response data.
 */
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

  /**
 * Extracts response data from HTTP response.
 * @param response - The HTTP response.
 * @returns The extracted response data or an empty object.
 */
  private extractResponseData(response: any): any {
    const body = response;
    return body || {};
  }

  /**
 * Handles HTTP errors.
 * @param error - The HTTP error.
 * @returns Observable with the error.
 */
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
