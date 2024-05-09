import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component'; 
import { SynopsisComponent } from '../synopsis/synopsis.component';

/** 
 * This component displays movie cards.
 * It provides functionality to interact with movies such as viewing details and adding to favorites.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = []; // Array to store all movies
  favorites: any[] = []; // Array to store favorite movies
  
  /**
   * Initializes the MovieCardComponent with required services.
   * 
   * @param fetchMovies The service responsible for fetching movie data from the API.
   * @param dialog The MatDialog service for opening dialog components.
   * @param snackBar The MatSnackBar service for displaying notifications.
   */
  constructor(
    public fetchMovies: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}
  
  /**
   * Lifecycle hook called after component initialization.
   * Fetches movies when the component is initialized.
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Fetches all movies from the API.
   * Sorts movies alphabetically by title after fetching.
   */
  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      this.sortMoviesAlphabetically();
    });
  }

  /**
   * Opens a dialog to display director information for the selected movie.
   * 
   * @param movie The selected movie object.
   */
  openDirectorDialog(movie: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px'; 
    dialogConfig.data = { movie }; 
    this.dialog.open(DirectorInfoComponent, dialogConfig);
  }

  /**
   * Opens a dialog to display genre information for the selected movie.
   * 
   * @param movie The selected movie object.
   */
  openGenreDialog(movie: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px'; 
    dialogConfig.data = { movie };
    this.dialog.open(GenreInfoComponent, dialogConfig);
  }
  
  /**
   * Opens a dialog to display synopsis information for the selected movie.
   * 
   * @param movie The selected movie object.
   */
  openSynopsisDialog(movie: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.data = { movie };
    this.dialog.open(SynopsisComponent, dialogConfig);
  }

  /**
   * Adds the selected movie to the user's list of favorite movies.
   * 
   * @param movie The selected movie object to be added to favorites.
   */
  addFavoriteMovie(movie: any): void {
    const MovieId = movie._id; // Assuming movie object has an _id field
    const user = JSON.parse(localStorage.getItem('currentUser') || '');
    const username = user.Username; // Placeholder for username (to be replaced with actual username retrieval)
    // API call to add the movie to user's favorites
    this.fetchMovies.addFavoriteMovie(username, MovieId).subscribe(
      (resp: any) => {
        console.log(resp);
        // Update favorites in local storage
        user.FavoriteMovies.push(MovieId);
        localStorage.setItem(username, JSON.stringify(user));

        // Update favorites array without reloading the page
        this.favorites.push(movie);
        // Display success message
        this.snackBar.open('Movie added to favorites', 'Success', {
          duration: 2000,
        });
      },
      (error: any) => {
        console.error(error);
        // Display error message if failed to add movie to favorites
        this.snackBar.open('Failed to add movie to favorites', 'Error', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * Sorts the list of movies alphabetically by title.
   */
  sortMoviesAlphabetically(): void {
    this.movies.sort((a, b) => {
      const moveTheToEnd = (title: string) => {
        if (title.toLowerCase().startsWith('the ')) {
          return title.substr(4) + ', The';
        }
        return title;
      };
  
      const modifiedTitleA = moveTheToEnd(a.Title);
      const modifiedTitleB = moveTheToEnd(b.Title);
  
      if (modifiedTitleA < modifiedTitleB) return -1;
      if (modifiedTitleA > modifiedTitleB) return 1;
      return 0;
    });
  }
}
