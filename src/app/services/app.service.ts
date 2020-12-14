import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Film } from '../interfaces/film.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {

  }

  getFeatured(): Observable<Film> {
    return this.http.get<Film[]>(environment.api + 'featured').pipe(
      map((data: Film[]) => {
        return data[0];
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error)))
  }

  getLatest() {
    return this.http.get<Film[]>(environment.api + 'latest').pipe(
      map((data: Film[]) => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error)))
  }

  getPopular() {
    return this.http.get<Film[]>(environment.api + 'popular').pipe(
      map((data: Film[]) => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error)))
  }

  getFilm(link: string): Observable<Film> {
    return this.http.get<Film>(environment.api + 'film/' + link).pipe(
      map((data: Film) => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error)))
  }

  setFilmWatched(link: string) {
    return this.http.post(environment.api + 'film/watch/' + link, {}).subscribe();
  }

  getSth() {
    return this.http.get('/api/get-sth').subscribe();
  }

  private handleError(err: HttpErrorResponse) {
 
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {

        errorMessage = `An error occurred: ${err.error.message}`;
    } else {

        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
}
}
