import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LoadAllFilms, LoadRandomFilms } from './film.actions';
import { AppService } from '../../services/app.service';
import { tap } from 'rxjs/operators';
import { Film } from '../../interfaces/film.interface';

interface FilmModel {
  list: Film[];
  randomList: Film[];
}

@State<FilmModel>({
  name: 'film',
  defaults: {
    list: [],
    randomList: [],
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
    return state.randomList;
  }

  @Action(LoadAllFilms)
  loadAllFilms(context: StateContext<FilmModel>) {
    return this.appService.loadAllFilms().pipe(
      tap((result: any) => {
        context.patchState({
          list: result.data,
        });
        context.dispatch(new LoadRandomFilms());
      }),
    );
  }

  @Action(LoadRandomFilms)
  loadRandomFilms(context: StateContext<FilmModel>) {
    const state = context.getState();
    const numberOfElementsNeeded = 6;
    const result = [];

    if (state.list.length === 0) {
      return;
    }

    for (let i = 0; i < numberOfElementsNeeded; i++) {
      result.push(state.list[Math.floor(Math.random() * state.list.length)]);
    }

    context.patchState({
      ...state,
      randomList: result,
    });
  }

  constructor(private appService: AppService) {}
}
