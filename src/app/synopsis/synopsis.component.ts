import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * This component displays the synopsis of a movie.
 * It provides functionality to show the synopsis details and close the dialog.
 */
@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss'],
})
export class SynopsisComponent {
  movie: any; // Object to store movie details

  /**
   * Initializes the SynopsisComponent with required services and data.
   * 
   * @param dialogRef The MatDialogRef service for interacting with the dialog.
   * @param data The data passed to the dialog component.
   */
  constructor(
    public dialogRef: MatDialogRef<SynopsisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Received data in SynopsisComponent:', data); // Log received data
    this.movie = data.movie; // Set movie details from the received data
  }

  /**
   * Closes the dialog component.
   */
  closeDialog(): void {
    this.dialogRef.close(); // Close the dialog
  }
}
