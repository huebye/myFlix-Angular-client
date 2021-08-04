import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-profile-delete',
  templateUrl: './profile-delete.component.html',
  styleUrls: ['./profile-delete.component.scss']
})
export class ProfileDeleteComponent implements OnInit {

  constructor(public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }
  removeUserAccount(): void {
    this.fetchApiData.deleteUser().subscribe((resp: any) => {
  
    });
    localStorage.clear();
        this.router.navigate(['/welcome']).then(() => {
          window.location.reload();
        });
      }

      cancel(): void {
        this.router.navigate(['/user']).then(() => {
          window.location.reload();
        });
      }
  }

