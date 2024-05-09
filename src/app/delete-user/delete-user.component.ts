import { Component, Input } from '@angular/core';
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
export class DeleteUserComponent {
  @Input() username: string | undefined;

  /** 
   * Initializes the DeleteUserComponent with required services.
   * 
   * @param delUser The service responsible for making API requests to delete user data.
   * @param snackBar The service for displaying snack bar notifications.
   * @param router The router service for navigation.
   */
  constructor(
    private delUser: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Deletes the user's account data from the server.
   * 
   * @param username The username of the user account to be deleted.
   */
  deleteUserData(username: string): void {
    this.delUser.deleteUser(username).subscribe((resp: any) => {
      // Handle response as needed
      console.log(resp);
      this.snackBar.open('Account deleted', 'Success', {
        duration: 2000,
      });
      this.router.navigate(['/welcome']);
    }, (error: any) => {
      console.error('Error deleting user:', error);
      // Handle error if needed
    });
  }
}
