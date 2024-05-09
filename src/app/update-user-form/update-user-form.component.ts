import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * This component renders the update user form.
 */
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user-form.component.html', // Correct path to HTML file
  styleUrls: ['./update-user-form.component.scss'] // Correct path to SCSS file
})
export class UpdateUserComponent implements OnInit {
  userData: any = {
    UserName: '', // Change this to an actual username if needed
    Password: '', // Change this to an actual password if needed
    Email: '', // Change this to an actual email if needed
    Birthdate: null // Change this to an actual Date value if needed
  };

  /**
   * Initializes the component with required services.
   * 
   * @param fetchApiData The service responsible for fetching user data from the API.
   * @param snackBar The service for displaying snack bar notifications.
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Fetches user data when the component initializes.
   */
  ngOnInit(): void {
    this.getUserData();
  }

  /**
   * Retrieves user data from the API.
   */
  getUserData(): void {
    const token = localStorage.getItem('token'); // Get the authentication token from localStorage
    if (token) {
      this.fetchApiData.getUserProfile().subscribe(
        (response: any) => {
          this.userData = response; // Assign user data from API response
        },
        (error: any) => {
          console.error('Error fetching user data:', error);
          // Handle error
        }
      );
    } else {
      console.error('Token not found.'); // Handle case where token is not available
    }
  }
  
  /**
   * Updates user data.
   */
  updateUser(): void {
    const username = 'example_username'; // Replace with actual username
    const userData = { ...this.userData }; // Make a copy of userData to avoid potential mutation
    this.fetchApiData.updateUser(username, userData).subscribe(
      (response: any) => {
        console.log('User data updated successfully:', response);
        // Display a success message using MatSnackBar
        this.snackBar.open('User data updated successfully', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      (error: any) => {
        console.error('Error updating user data:', error);
        // Display an error message using MatSnackBar
        this.snackBar.open('Failed to update user data', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    );
  }
}
