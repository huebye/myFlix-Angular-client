import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  @Input() userDetails = { Name: '', Password: '', Email: '', Birthday: '' };
  user: any = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UpdateProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

ngOnInit(): void {
}

getUser(): void {
  const user = localStorage.getItem('user');
  this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

// This is the function responsible for sending the form inputs to the backend
editUser(): void {
    this.fetchApiData.editUser(this.userDetails).subscribe((result) => {
      localStorage.setItem('user',this.userDetails.Name)
  // Logic for a successful user registration goes here! (To be implemented)
     this.dialogRef.close(); // This will close the modal on success!
     console.log(result)
     this.router.navigate(['/user']).then(() => {
      window.location.reload();
    });
     this.snackBar.open(result, 'OK', {
        duration: 2000
     });
    }, (result) => {
      console.log(result)
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
