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
  /**
   * 
   * @param apiApi fetching data from an api
   * @param snackBar angular material library showing messages for the user
   * @param dialog angular material library open a dialog window
   */
  constructor(public dialog: MatDialog, public fetchApiData: FetchApiDataService,public snackBar: MatSnackBar, public router: Router) { }

/**
   * loading movies and favorite movies on initiation of component
   */  
ngOnInit(): void {
  this.getMovies();
  this.favedMovies();
}

/**
   * loading movies from api
   */  
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

/**
   * loading movies that are favorites of the current user
   */  
  favedMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favoriteMovieIds = resp.FavoriteMovies;
    });
  }

/**
   * opens director view displaying information
   * @param Name Name of director
   * @param Bio bio details of director
   * @param Birth birthyear of director
   */
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
/**
   * opens Genre Dialog displaying information
   */  
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

/**
   * filters faovirte movies id from all movies id 
   * @returns boolean
   */ 
  isFavoured(movieID: string): boolean {
    return this.favoriteMovieIds.includes(movieID);
  };


 /**
   * allows user to favor movie and unfavor it 
   */ 
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

  /**
   * load user profile view
   */ 
  goToUserView(): void {
    this.router.navigate(['/user']);
  }
}