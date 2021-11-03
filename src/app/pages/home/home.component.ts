import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FilmStore } from 'src/app/stores/film/film.store';
import { Film } from '../../interfaces/film.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @Select(FilmStore.films) films$: Observable<Film[]>;
}
