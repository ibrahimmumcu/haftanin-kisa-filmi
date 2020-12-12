import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from 'src/app/interfaces/film.interface';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit, AfterViewInit {

  @ViewChild('videoContainer') videoContainer: ElementRef;

  films: Film[];
  link: string;
  film: Film;
  latestFilms: Film[];
  popularFilms: Film[];

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
  ) {
    this.route.paramMap.subscribe(params => {
      this.films = this.appService.movies;
      this.link = params.get('link');
      this.setCurrentMovie();
    });
  }

  ngOnInit() {
    this.latestFilms = this.films.slice(0, 6);
    const popularFilmsArr = this.films.slice();
    this.popularFilms = popularFilmsArr.sort( function() { return 0.5 - Math.random() } ).slice(0, 6);
  }

  private setCurrentMovie() {
    if (this.link === null) {
      this.router.navigate(['/']);
      return;
    }
    this.film = this.films.find(film => film.link === this.link);
    this.setMeta();
    window.scrollTo(0, 0);
  }

  private setMeta() {
    const title = 'Haftanın Kısa Filmi: ' + this.film.title;
    this.titleService.setTitle(title);
    this.metaService.updateTag({property: 'og:title', content: title});
    this.metaService.updateTag({name: 'twitter:text:title', content: title});
    this.metaService.updateTag({name: 'description', content: this.film.description});
    this.metaService.updateTag({property: 'og:description', content: this.film.description});
    this.metaService.updateTag({property: 'og:url', content: 'https://www.haftaninkisafilmi.com' + this.router.url});
    this.metaService.updateTag({property: 'og:image', content: this.film.featuredImage});
    this.metaService.updateTag({property: 'og:image:secure_url', content: this.film.featuredImage});
    this.metaService.updateTag({name: 'twitter:image', content: this.film.featuredImage});
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
