import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/** 
 * This component renders the toolbar at the top of the page.
 * It provides functionality to navigate to different pages and check the current route.
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
 
  /**
   * Initializes the component.
   */
  ngOnInit(): void {}

  /**
   * Initializes the ToolbarComponent with the router service.
   * 
   * @param router The router service for navigation.
   */
  constructor(private router: Router) {}

  /**
   * Navigates to the movies page.
   */
  navigateToMovies(): void {
    this.router.navigate(['/movies']); // Navigate to the movies page
  }

  /**
   * Navigates to the welcome page and clears local storage.
   */
  navigateToWelcome(): void {
    localStorage.clear(); // Clear local storage
    this.router.navigate(['/welcome']); // Navigate to the welcome page
  }

  /**
   * Navigates to the profile page.
   */
  navigateToProfile(): void {
    this.router.navigate(['/profile']); // Navigate to the profile page
  }
  
  /** 
   * Checks if the current route is the profile route.
   * 
   * @returns A boolean indicating if the current route is the profile route.
   */
  isOnProfileRoute(): boolean {
    return this.router.url === '/profile'; // Check if the current route is '/profile'
  }

  /**
   * Checks if the current route is the movies route.
   * 
   * @returns A boolean indicating if the current route is the movies route.
   */
  isOnMoviesRoute(): boolean {
    return this.router.url === '/movies'; // Check if the current route is '/movies'
  }
}
