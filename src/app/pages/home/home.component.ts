import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Film } from '../../interfaces/film.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  latestFilms: Film[];
  popularFilms: Film[];
  films: Film[];
  featuredFilm: Film;

  constructor(
    private appService: AppService,
  ) {
    this.films = this.appService.movies;
  }

  ngOnInit(): void {
    this.latestFilms = this.films.slice(0, 6);
    const popularFilmsArr = this.films.slice();
    this.popularFilms = popularFilmsArr.sort( function() { return 0.5 - Math.random() } ).slice(0, 6);
    this.featuredFilm = this.films[Math.floor(Math.random() * this.films.length)];
  }

}
