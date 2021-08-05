import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) { }
// This is the function that will open the dialog when the signup button is clicked  
openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
// Assigning the dialog a width
    maxWidth: '300px'
    });
  }

openUserLoginDialog(): void {
  this.dialog.open(UserLoginFormComponent, {
    maxWidth: '300px'
  });
}

openMoviesDialog(): void {
  this.dialog.open(MovieCardComponent, {
    width: 'auto',
  });
}
}