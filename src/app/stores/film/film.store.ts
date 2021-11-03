import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LoadAllFilms } from './film.actions';
import { AppService } from '../../services/app.service';
import { tap } from 'rxjs/operators';
import { Film } from '../../interfaces/film.interface';

interface FilmModel {
  list: Film[];
}

@State<FilmModel>({
  name: 'film',
  defaults: {
    list: [],
  },
})
@Injectable()
export class FilmStore {
  @Selector()
  static films(state: FilmModel) {
    return state.list;
  }

  @Selector()
  static randomFilms(state: FilmModel) {
    const numberOfElementsNeeded = 6;
    const result = [];
    for (let i = 0; i < numberOfElementsNeeded; i++) {
      result.push(state.list[Math.floor(Math.random() * state.list.length)]);
    }
    return result;
  }

  @Action(LoadAllFilms)
  loadAllFilms(context: StateContext<FilmModel>) {
    return this.appService.loadAllFilms().pipe(
      tap((result: any) => {
        context.patchState({
          list: result.data,
        });
      }),
    );
  }

  constructor(private appService: AppService) {}
}
