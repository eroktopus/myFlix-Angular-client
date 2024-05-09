import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule and Routes

import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component'; // Import the LoginComponent
import { MovieCardComponent} from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DirectorInfoComponent } from './director-info/director-info.component';
import { GenreInfoComponent } from './genre-info/genre-info.component';
import { SynopsisComponent } from './synopsis/synopsis.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { UpdateUserComponent } from './update-user-form/update-user-form.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';


 

// Define routes for the application
const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent, 
    MovieCardComponent, WelcomePageComponent, DirectorInfoComponent, GenreInfoComponent, SynopsisComponent, ToolbarComponent, ProfilePageComponent, UpdateUserComponent, DeleteUserComponent 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes) // Use appRoutes instead of routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
