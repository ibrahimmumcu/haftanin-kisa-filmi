import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AllFilm, Film } from '../interfaces/film.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  allFilmCounter = new BehaviorSubject<number>(0);
  allFilmCounter$ = this.allFilmCounter.asObservable();

  allFilms = new BehaviorSubject<Film[]>([]);
  allFilms$ = this.allFilms.asObservable();

  constructor(private http: HttpClient) {}

  getFeatured(): Observable<Film> {
    return this.http.get<Film[]>('/api/featured').pipe(
      map((data: Film[]) => {
        return data[0];
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }

  getLatest(): Observable<Film[]> {
    return this.http.get<Film[]>('/api/latest').pipe(
      map((data: Film[]) => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }

  getPopular(): Observable<Film[]> {
    return this.http.get<Film[]>('/api/popular').pipe(
      map((data: Film[]) => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }

  getAll(page: number, sortBy: string = 'latest') {
    return this.http.get<AllFilm>(`/api/all?page=${page}&sortBy=${sortBy}&perPage=10000`).pipe(
      map((result: AllFilm) => {
        this.allFilmCounter.next(result.counter);
        this.allFilms.next(result.data);
        return result.data;
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }

  getFilm(link: string): Observable<Film> {
    return this.http.get<Film>('/api/film/' + link).pipe(
      map((data: Film) => {
        return data;
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }

  search(searchTerm: string): Observable<Film[]> {
    return this.http.get<Film[]>('/api/search?searchTerm=' + searchTerm).pipe(
      map((result: Film[]) => {
        return result;
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error)),
    );
  }

  setFilmWatched(link: string) {
    return this.http.post('/api/film-watch/' + link, {}).subscribe();
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
