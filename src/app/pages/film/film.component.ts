import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from 'src/app/interfaces/film.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements AfterViewInit {

  @ViewChild('videoContainer') videoContainer: ElementRef;

  link: string;
  film: Film;
  popularFilms$: Observable<Film[]>;

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
  ) {
    this.route.paramMap.subscribe(params => {
      this.link = params.get('link');

      if (this.link === null) {
        this.router.navigate(['/']);
        return;
      }

      this.getCurrentFilm(this.link);
      window.scrollTo(0, 0);
      this.popularFilms$ = this.appService.getPopular();
    });
  }

  getCurrentFilm(link: string) {
    this.appService.getFilm(link).subscribe((film: Film) => {
      this.film = film;
      this.setMeta(film);
    });
    this.appService.setFilmWatched(link);
  }

  private setMeta(film: Film) {
    const title = 'Haftanın Kısa Filmi: ' + film.title;
    this.titleService.setTitle(title);
    this.metaService.updateTag({property: 'og:title', content: title});
    this.metaService.updateTag({name: 'twitter:text:title', content: title});
    this.metaService.updateTag({name: 'description', content: film.description});
    this.metaService.updateTag({property: 'og:description', content: film.description});
    this.metaService.updateTag({property: 'og:url', content: 'https://www.haftaninkisafilmi.com' + this.router.url});
    this.metaService.updateTag({property: 'og:image', content: film.featuredImage});
    this.metaService.updateTag({property: 'og:image:secure_url', content: film.featuredImage});
    this.metaService.updateTag({name: 'twitter:image', content: film.featuredImage});
  }

  ngAfterViewInit() {
    /*
    const title = 'Haftanın Kısa Filmi: ' + this.film.title;
    const hasIframe = this.videoContainer.nativeElement.getElementsByTagName('iframe').length > 0;
    if (hasIframe) {
      this.videoContainer.nativeElement.getElementsByTagName('iframe')[0].setAttribute('title', title);
    }
    */
  }
}
