import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; // Import the Router service

/**
 * This component renders the user login form.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  /**
   * Input data for the user login form.
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * Initializes the component with required services.
   * 
   * @param fetchApiData The service responsible for fetching data from the API.
   * @param dialogRef The reference to the dialog component.
   * @param snackBar The service for displaying snack bar notifications.
   * @param router The router service for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar, // Inject the MatSnackBar service
    private router: Router // Inject the Router service
  ) { }

  /**
   * Fetches user data when the component initializes.
   */
  ngOnInit(): void {
  }

  /**
   * Logs in the user.
   */
  LoginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result: any) => {
        localStorage.setItem('currentUser', JSON.stringify(result.user)); // Store current user data in localStorage
        localStorage.setItem('token', result.token); // Store authentication token in localStorage
        this.getUserProfile(); // Call getUserProfile after successful login
        this.dialogRef.close(); // Close the login dialog
        this.router.navigate(['movies']); // Navigate to the movies page
        this.snackBar.open('Login successful', 'OK', { duration: 2000 }); // Display a success message
      },
      (error: any) => {
        this.snackBar.open(error, 'NOT OK', { duration: 2000 }); // Display an error message
      }
    );
  }
  
  /** 
   * Fetches the user's profile after successful login.
   */
  getUserProfile(): void {
    this.fetchApiData.getUserProfile().subscribe(
      (profile: any) => {
        localStorage.setItem('userProfile', JSON.stringify(profile)); // Store user profile data in localStorage
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
}
