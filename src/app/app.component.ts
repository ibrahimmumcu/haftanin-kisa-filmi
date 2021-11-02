import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  isMoviePage = false;

  constructor(private router: Router) {
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
  }
}
