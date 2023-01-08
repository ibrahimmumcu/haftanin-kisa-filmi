import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AllFilms } from '../interfaces/film.interface';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  constructor(private httpClient: HttpClient) { }

  setFilmWatched(link: string) {
    return this.httpClient.post('/api/film-watch/' + link, {}).subscribe();
  }

  loadAllFilms(): Observable<AllFilms> {
    return this.httpClient.get<AllFilms>(`/api/all?page=1&sortBy=latest&perPage=10000`);
  }
}
