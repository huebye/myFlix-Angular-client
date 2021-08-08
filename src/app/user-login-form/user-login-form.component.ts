import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Name: '', Password: ''};

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

ngOnInit(): void {
}
 /**
   * allows user to log in and opens movieView
   */ 

loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', result.user.Name);
  // Logic for a successful user registration goes here! (To be implemented)
     this.dialogRef.close(); // This will close the modal on success!
     console.log(result)
     this.snackBar.open(result, 'OK', {
        duration: 2000
     });
     this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  }