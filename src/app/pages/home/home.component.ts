import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { Film } from '../../interfaces/film.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  latestFilms$: Observable<Film[]>;
  popularFilms$: Observable<Film[]>;
  featuredFilm$: Observable<Film>;

  constructor(
    private appService: AppService,
  ) {
    this.latestFilms$ = this.appService.getLatest();
    this.popularFilms$ = this.appService.getPopular();
    this.featuredFilm$ = this.appService.getFeatured();
  }
}
