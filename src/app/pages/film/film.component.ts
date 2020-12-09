import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit, AfterViewInit {

  @ViewChild('videoContainer') videoContainer: ElementRef;

  movies = [];
  currentMovie: any;
  currentIndex = 0;
  nextMovie: any;
  previousMovie: any;
  slug: string;

  constructor(
    private appConfigService: AppConfigService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
  ) {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      this.setCurrentMovie();
    });
  }

  ngOnInit() {
  }

  private setCurrentMovie() {
    this.movies = this.appConfigService.movies;

    if (this.slug === null) {
      this.slug = this.movies[0].link;
      this.router.navigate(['/film', this.slug]);
    }

    this.currentIndex = this.movies.findIndex(movie => movie.link === this.slug);
    this.currentMovie = this.movies[this.currentIndex];

    if (this.currentIndex !== this.movies.length - 1) {
      this.nextMovie = this.movies[this.currentIndex + 1];
    } else {
      this.nextMovie = undefined;
    }

    if (this.currentIndex !== 0) {
      this.previousMovie = this.movies[this.currentIndex - 1];
    } else {
      this.previousMovie = undefined;
    }

    this.setMeta();
  }

  private setMeta() {
    const title = 'Haftanın Kısa Filmi: ' + this.currentMovie.title;
    this.titleService.setTitle(title);
    this.metaService.updateTag({property: 'og:title', content: title});
    this.metaService.updateTag({name: 'twitter:text:title', content: title});
    this.metaService.updateTag({name: 'description', content: this.currentMovie.description});
    this.metaService.updateTag({property: 'og:description', content: this.currentMovie.description});
    this.metaService.updateTag({property: 'og:url', content: 'https://www.haftaninkisafilmi.com' + this.router.url});
    this.metaService.updateTag({property: 'og:image', content: this.currentMovie.featuredImage});
    this.metaService.updateTag({property: 'og:image:secure_url', content: this.currentMovie.featuredImage});
    this.metaService.updateTag({name: 'twitter:image', content: this.currentMovie.featuredImage});
  }

  ngAfterViewInit() {
    const title = 'Haftanın Kısa Filmi: ' + this.currentMovie.title;
    const hasIframe = this.videoContainer.nativeElement.getElementsByTagName('iframe').length > 0;
    if (hasIframe) {
      this.videoContainer.nativeElement.getElementsByTagName('iframe')[0].setAttribute('title', title);
    }
  }
}
