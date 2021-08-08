import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UpdateProfileComponent } from '../update-profile/update-profile.component'
import { MatDialog } from '@angular/material/dialog';
import { ProfileDeleteComponent } from '../profile-delete/profile-delete.component'
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any = [];
  favourite: any = [];
  constructor(public dialog: MatDialog, public fetchApiData: FetchApiDataService, public router: Router) { }

  ngOnInit(): void {
    this.getUser();
    this.getMovies();
  }

/**
   * gets data of current user 
   */  
  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
        return this.user;
      });
    }
/**
   * opens dialog to delete account 
   */  
    openDeleteDialog(): void {
      this.dialog.open(ProfileDeleteComponent);
      console.log('hi')
    }
/**
   * loads all movies and runs filterFavorites()
   */  
    getMovies(): void {
      this.fetchApiData.getAllMovies().subscribe((res: any) => {
        this.movies = res;
        this.filterFavorites();
      });
    }
/**
   * filters movies if they are a favorite movie
   */  
    filterFavorites(): void {
      this.movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.includes(movie._id)) {
          this.favourite.push(movie);
        }
      });
      console.log(this.favourite);
      return this.favourite;
    }
/**
   * opens dialog to update user information
   */  
    openUserUpdateDialog(): void {
      this.dialog.open(UpdateProfileComponent, {
        width: '380px'
      });
    }
/**
   * allows user to remove a favorite from the movie list 
   */  
    removeFavorites(id: string): void {
      this.fetchApiData.removeFavorite(id).subscribe((resp: any) => {
        this.router.navigate(['/user']).then(() => {
          window.location.reload();
        });
      });
   }
/**
   * allows user to go back to the movie view
   */  
   backToMovies(): void {
     this.router.navigate(['/movies'])
   };
}