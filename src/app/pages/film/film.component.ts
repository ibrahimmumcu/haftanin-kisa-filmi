import { Component, ViewChild, ElementRef } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Film } from 'src/app/interfaces/film.interface';
import { filter, Observable } from 'rxjs';
import { FilmStore } from 'src/app/stores/film/film.store';
import { Select, Store } from '@ngxs/store';
import { LoadRandomFilms } from 'src/app/stores/film/film.actions';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
})
export class FilmComponent {
  @ViewChild('videoContainer') videoContainer: ElementRef;

  link: string;
  film: Film;
  @Select(FilmStore.randomFilms) randomFilms$: Observable<Film[]>;
  @Select(FilmStore.films) films$: Observable<Film[]>;

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    private store: Store,
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.link = params.get('link');

      if (this.link === null) {
        this.router.navigate(['/']);
        return;
      }

      if (this.router.getCurrentNavigation().extras.state?.film) {
        this.film = this.router.getCurrentNavigation().extras.state?.film;
        this.setMeta(this.film);
        this.filmService.setFilmWatched(this.link);
      } else {
        this.getCurrentFilm(this.link);
      }

      this.store.dispatch(new LoadRandomFilms());
    });
  }

  getCurrentFilm(link: string) {
    this.films$.pipe(filter(data => data.length > 0)).subscribe((films: Film[]) => {
      this.film = films.filter((film: Film) => film.link === link)[0];
      this.setMeta(this.film);
      this.filmService.setFilmWatched(link);
    });
  }

  private setMeta(film: Film) {
    const title = 'Haftanın Kısa Filmi: ' + film.title;
    this.titleService.setTitle(title);
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ name: 'twitter:text:title', content: title });
    this.metaService.updateTag({ name: 'description', content: film.description });
    this.metaService.updateTag({ property: 'og:description', content: film.description });
    this.metaService.updateTag({ property: 'og:url', content: 'https://haftaninkisafilmi.com' + this.router.url });
    this.metaService.updateTag({ property: 'og:image', content: this.film.featuredImageFileLocation });
    this.metaService.updateTag({ property: 'og:image:secure_url', content: this.film.featuredImageFileLocation });
    this.metaService.updateTag({ name: 'twitter:image', content: this.film.featuredImageFileLocation });
  }
}
