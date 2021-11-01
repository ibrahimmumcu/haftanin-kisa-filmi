import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { Film } from '../../interfaces/film.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  latestFilms$: Observable<Film[]>;
  popularFilms$: Observable<Film[]>;
  featuredFilm$: Observable<Film>;

  films$: Observable<Film[]>;
  sortBy: string;
  page: number;

  constructor(private appService: AppService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.sortBy = params.get('sortBy');
      this.page = params.get('page') ? Number(params.get('page')) : 1;

      if (this.sortBy === null) {
        this.sortBy = 'latest';
      }

      this.films$ = this.appService.getAll(this.page, this.sortBy);
    });
    //this.latestFilms$ = this.appService.getLatest();
    //this.popularFilms$ = this.appService.getPopular();
    //this.featuredFilm$ = this.appService.getFeatured();
  }
}
