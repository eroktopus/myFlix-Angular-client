import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/** 
 * This component displays genre information in a dialog.
 */
@Component({
  selector: 'app-genre-info',
  templateUrl: './genre-info.component.html',
  styleUrls: ['./genre-info.component.scss'],
})
export class GenreInfoComponent implements OnInit {
  genre: any; // Holds genre information obtained from the movie data
  genredescription: string; // Holds the description of the genre
  
  /**
   * Constructs the GenreInfoComponent and initializes genre data.
   * 
   * @param dialogRef Reference to the dialog component.
   * @param data Data passed to the dialog component, containing movie information.
   */
  constructor(
    public dialogRef: MatDialogRef<GenreInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Extract genre and genre description from the passed movie data
    this.genre = data.movie.Genre;
    this.genredescription = data.movie.genredescription;
  }

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
    // Any initialization logic can go here
  }

  /**
   * Closes the genre info dialog when called.
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
