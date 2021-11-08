import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { filter } from 'rxjs/operators';
import { LoadAllFilms } from './stores/film/film.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  isMoviePage = false;

  constructor(private router: Router, private store: Store) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        window.scroll(0, 0);
        if (this.router.url.indexOf('/film/') > -1) {
          this.isMoviePage = true;
        } else {
          this.isMoviePage = false;
        }
      });

    this.store.dispatch(new LoadAllFilms());
  }
}
