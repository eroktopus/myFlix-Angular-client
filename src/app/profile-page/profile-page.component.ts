import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';

/** 
 * This component renders the user profile page.
 * It provides functionality to display user profile information, favorite movies, and manage user actions.
 */
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  movies: any[] = []; // Array to store all movies
  favorites: any[] = []; // Array to store favorite movies
  username: string = ''; // User's username
  password: string = ''; // User's password
  email: string = ''; // User's email
  birthday: string = ''; // User's birthday
  profilePage: any; // Object to store user profile data
  favoriteMovies: any[] = []; // Array to store user's favorite movies
  
  /**
   * Initializes the ProfilePageComponent with required services.
   * 
   * @param snackBar The MatSnackBar service for displaying notifications.
   * @param dialog The MatDialog service for opening dialog components.
   * @param fetchMovies The service responsible for fetching movie data from the API.
   */
  constructor(
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    public fetchMovies: FetchApiDataService 
  ) {}

  /**
   * Lifecycle hook called after component initialization.
   * Fetches user profile and favorite movies when the component is initialized.
   */
  ngOnInit(): void {
    console.log('Profile page component initialized');
    this.getFavoriteMoviesForCurrentUser(); 
    this.getUserProfile(); 
  }
  
  /**
   * Fetches the user profile information from local storage and the API.
   */
  getUserProfile(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.username = currentUser ? currentUser.Username : ''; // Set username
    this.password = currentUser ? currentUser.Password : ''; // Set password
    this.email = currentUser ? currentUser.Email : ''; // Set email
    this.birthday = currentUser ? currentUser.Birthday : ''; // Set birthday
    this.fetchMovies.getUserProfile().subscribe(
      (profile: any) => {
        this.profilePage = profile;
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
  
  /**
   * Fetches the list of favorite movies for the current user.
   */
  getFavoriteMoviesForCurrentUser(): void {
    const username = 'currentUser';
    this.fetchMovies.getFavoriteMovies(username).subscribe((favoriteMovies: any) => {
      this.favoriteMovies = favoriteMovies;
    });
  }

  /**
   * Opens a dialog to display the synopsis of the selected movie.
   * 
   * @param movie The selected movie object.
   */
  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisComponent, {
      data: { movie },
      width: '600px',
    });
  }

  /**
   * Opens a dialog to display the director information of the selected movie.
   * 
   * @param movie The selected movie object.
   */
  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: { directorName: movie.Director },
      width: '600px',
    });
  }

  /**
   * Removes a movie from the user's list of favorite movies.
   * 
   * @param movie The movie object to be removed from favorites.
   */
  removeFavoriteMovie(movie: any): void {
    this.fetchMovies.removeFavoriteMovie(this.username, movie._id).subscribe((resp: any) => {
      const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
      user.FavoriteMovies = user.FavoriteMovies.filter((id: string) => id !== movie._id);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.favoriteMovies = this.favoriteMovies.filter((favorite) => favorite._id !== movie._id);
      this.snackBar.open('Movie removed', 'Success', {
        duration: 2000,
      });
    });
  }
}
