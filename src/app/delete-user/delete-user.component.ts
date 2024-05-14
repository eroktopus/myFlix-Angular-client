import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * This component manages the deletion of a user's account.
 * It provides functionality to delete user data from the server.
 */
@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit {
  userData: any = {
    UserName: '', // Change this to an actual username if needed
    Password: '', // Change this to an actual password if needed
    Email: '', // Change this to an actual email if needed
    Birthdate: null // Change this to an actual Date value if needed
  };
  /** 
   * Initializes the DeleteUserComponent with required services.
   * 
   * @param delUser The service responsible for making API requests to delete user data.
   * @param snackBar The service for displaying snack bar notifications.
   * @param router The router service for navigation.
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
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
   * Deletes the user's account data from the server.
   * 
   * @param username The username of the user account to be deleted.
   */
  deleteUserData(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || '');
    const username = user.Username; 
    this.fetchApiData.deleteUser(username).subscribe(
      (response: any) => {
        // Success: user deleted
        console.log('Account deleted successfully:', response);
        this.snackBar.open('Account deleted successfully', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/welcome']);
      },
      (error: any) => {
        // Error handling
        console.error('Error deleting user:', error);
        if (error.status === 200) {
          // Successful deletion, but received a response with status 200
          console.log('Account deleted successfully');
          this.snackBar.open('Account deleted successfully', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
          this.router.navigate(['/welcome']);
        } else {
          // Other error
          let errorMessage = 'Failed to delete account';
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = error.error.message;
          } else {
            // Server-side error
            errorMessage = error.error?.message || errorMessage;
          }
          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      }
    );
  }}
  
  
  