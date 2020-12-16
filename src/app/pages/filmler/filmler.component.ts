import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Film } from 'src/app/interfaces/film.interface';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-filmler',
  templateUrl: './filmler.component.html',
  styleUrls: ['./filmler.component.scss']
})
export class FilmlerComponent implements OnInit {

  films$: Observable<Film[]>;
  sortBy: string;
  counter$: Observable<number>;
  perPage = 24;
  page: number;
  numberOfPages: number[];

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(params => {
      this.sortBy = params.get('sortBy');
      this.page = params.get('page') ? Number(params.get('page')) : 1;

      if (this.sortBy === null) {
        this.sortBy = 'latest';
      }

      window.scrollTo(0, 0);
      this.films$ = this.appService.getAll(this.page, this.sortBy);
    });

    this.counter$ = this.appService.allFilmCounter$;
  }

  ngOnInit(): void {
    this.counter$.subscribe((numberOfFilms: number) => {
      this.numberOfPages = Array(Math.ceil(numberOfFilms / this.perPage)).fill(0).map((x,i)=>i + 1);
    }); 
  }

}
