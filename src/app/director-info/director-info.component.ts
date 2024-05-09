import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/** 
 * This component displays director information in a dialog.
 */
@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrls: ['./director-info.component.scss'],
})
export class DirectorInfoComponent implements OnInit {
  director: any; // Holds director information fetched from the API
  movie: any; // Holds movie information passed from the parent component

  /**
   * Constructs the DirectorInfoComponent and initializes the movie data.
   * 
   * @param dialogRef Reference to the dialog component.
   * @param fetchDirector Service responsible for fetching director details from the API.
   * @param data Data passed to the dialog component, containing movie information.
   */
  constructor(
    public dialogRef: MatDialogRef<DirectorInfoComponent>,
    public fetchDirector: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movie = data.movie;
  }

  /**
   * Fetches director details when the component is initialized.
   * Uses the director name obtained from the movie data.
   */
  ngOnInit(): void {
    const directorName = this.movie.Director;
    this.getDirectorDetails(directorName);
  }

  /**
   * Retrieves director details from the API.
   * 
   * @param directorName The name of the director for whom details are fetched.
   */
  getDirectorDetails(directorName: string): void {
    this.fetchDirector.getDirector(directorName).subscribe(
      (resp: any) => {
        this.director = resp;
      },
      (error: any) => {
        console.error('Error fetching director details:', error);
      }
    );
  }

  /**
   * Closes the director info dialog when called.
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
