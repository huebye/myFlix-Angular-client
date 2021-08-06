import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovieIds: any[] = [];
  constructor(public dialog: MatDialog, public fetchApiData: FetchApiDataService,public snackBar: MatSnackBar, public router: Router) { }

ngOnInit(): void {
  this.getMovies();
  this.favedMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  favedMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favoriteMovieIds = resp.FavoriteMovies;
    });
  }


  openDirectorDialog(name: string,bio: string,birth: string): void {
    this.dialog.open(DirectorDialogComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth
      },
      maxWidth: '800px',
      width: 'auto'
    });
  }

  openGenreDialog(description: string, name: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        Description: description,
        Name: name
      },
      maxWidth: '800px',
      width: 'auto',
    });
  }

  isFavoured(movieID: string): boolean {
    return this.favoriteMovieIds.includes(movieID);
  };
 
  toggleFavouriteMovies(id: string): any {
    if (this.isFavoured(id)) {
      this.fetchApiData.removeFavorite(id).subscribe((resp: any) => {
        this.snackBar.open('Removed from favourites!', 'Ok', {
          duration: 2000,
        });
      });
      const index = this.favoriteMovieIds.indexOf(id);
      return this.favoriteMovieIds.splice(index, 1);
    } else {
      this.fetchApiData.addFavoriteMovie(id).subscribe((response: any) => {
        this.snackBar.open('Added to favourites!', 'Ok', {
          duration: 2000,
        });
      });
    }
    return this.favoriteMovieIds.push(id);
  }

  goToUserView(): void {
    this.router.navigate(['/user']);
  }
}