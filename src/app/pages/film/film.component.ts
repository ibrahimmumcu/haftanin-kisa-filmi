import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Film } from 'src/app/interfaces/film.interface';
import { filter } from 'rxjs';
import { Store } from '@ngxs/store';
import { LoadRandomFilms } from 'src/app/stores/film/film.actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
})
export class FilmComponent implements OnInit {
  @ViewChild('videoContainer') videoContainer: ElementRef;

  link: string;
  film: Film;
  randomFilms: Film[];

  constructor(
    private filmService: FilmService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    private store: Store,
  ) {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params: ParamMap) => {
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

  ngOnInit(): void {
    this.store
      .select(state => state.film.randomList)
      .pipe(
        untilDestroyed(this),
        filter(randomFilms => randomFilms.length > 0),
      )
      .subscribe((randomFilms: Film[]) => {
        this.randomFilms = randomFilms;
      });
  }

  getCurrentFilm(link: string) {
    this.store
      .select(state => state.film.list)
      .pipe(
        filter(data => data.length > 0),
        untilDestroyed(this),
      )
      .subscribe((films: Film[]) => {
        this.film = films.filter((film: Film) => film.link === link)[0];

        if (!this.film) {
          this.router.navigate(['/']);
          return;
        }

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
    this.metaService.updateTag({
      property: 'og:image',
      content: 'https://haftaninkisafilmi.com' + this.film.featuredImageFileLocation,
    });
    this.metaService.updateTag({
      property: 'og:image:secure_url',
      content: 'https://haftaninkisafilmi.com' + this.film.featuredImageFileLocation,
    });
    this.metaService.updateTag({
      name: 'twitter:image',
      content: 'https://haftaninkisafilmi.com' + this.film.featuredImageFileLocation,
    });
  }
}
