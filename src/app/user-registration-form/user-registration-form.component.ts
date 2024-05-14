import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/** 
 * This component renders the user registration form.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  /**
   * Input data for the user registration form.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Initializes the component with required services.
   * 
   * @param fetchApiData The service responsible for fetching data from the API.
   * @param dialogRef The reference to the dialog component.
   * @param snackBar The service for displaying snack bar notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Fetches user data when the component initializes.
   */
  ngOnInit(): void {
  }

  /**
   * Registers the user.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response: any) => {
        // Logic for a successful user registration
        this.dialogRef.close(); // Close the modal on success
        const successMessage = typeof response === 'string' ? response : 'User registered successfully';
        this.snackBar.open(successMessage, 'OK', {
          duration: 2000
        });
      },
      (error: any) => {
        // Handle error on user registration
        console.error('Error on user registration:', error);
        const errorMessage = typeof error === 'string' ? error : 'Failed to register user';
        this.snackBar.open(errorMessage, 'OK', {
          duration: 2000
        });
      }
    );
  }}
  
