import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AllFilms, Film } from '../interfaces/film.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  allFilmCounter = new BehaviorSubject<number>(0);
  allFilmCounter$ = this.allFilmCounter.asObservable();

  constructor(private httpClient: HttpClient) { }

  getFilm(link: string): Observable<Film> {
    return this.httpClient.get<Film>('/api/film/' + link).pipe(
      map((data: Film) => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }

  setFilmWatched(link: string) {
    return this.httpClient.post('/api/film-watch/' + link, {}).subscribe();
  }

  loadAllFilms(): Observable<AllFilms> {
    return this.httpClient.get<AllFilms>(`/api/all?page=1&sortBy=latest&perPage=10000`);
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
