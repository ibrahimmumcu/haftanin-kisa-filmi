import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Film } from 'src/app/interfaces/film.interface';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-filmler',
  templateUrl: './filmler.component.html',
  styleUrls: ['./filmler.component.scss']
})
export class FilmlerComponent implements OnInit {

  films$: Observable<Film[]>;
  sortBy: string;
  counter$: Observable<number>;
  perPage = 24;
  page: number;
  numberOfPages: number[];

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
  ) {
    this.route.paramMap.subscribe(params => {
      this.sortBy = params.get('sortBy');
      this.page = params.get('page') ? Number(params.get('page')) : 1;

      if (this.sortBy === null) {
        this.sortBy = 'latest';
      }

      this.films$ = this.appService.getAll(this.page, this.sortBy);
    });

    this.counter$ = this.appService.allFilmCounter$;

    this.setMeta();
  }

  ngOnInit(): void {
    this.counter$.subscribe((numberOfFilms: number) => {
      this.numberOfPages = Array(Math.ceil(numberOfFilms / this.perPage)).fill(0).map((x,i)=>i + 1);
    }); 
  }

  private setMeta() {
    const title = 'Haftanın Kısa Filmi: Filmler';
    this.titleService.setTitle(title);
    this.metaService.updateTag({property: 'og:title', content: title});
    this.metaService.updateTag({name: 'twitter:text:title', content: title});
    this.metaService.updateTag({name: 'description', content: 'En iyi kısa filmleri izle.'});
    this.metaService.updateTag({property: 'og:description', content: 'En iyi kısa filmleri izle.'});
    this.metaService.updateTag({property: 'og:url', content: 'https://www.haftaninkisafilmi.com' + this.router.url});
    this.metaService.updateTag({property: 'og:image', content: 'https://www.haftaninkisafilmi.com/assets/img/haftanin-kisa-filmi.png'});
    this.metaService.updateTag({property: 'og:image:secure_url', content: 'https://www.haftaninkisafilmi.com/assets/img/haftanin-kisa-filmi.png'});
    this.metaService.updateTag({name: 'twitter:image', content: 'https://www.haftaninkisafilmi.com/assets/img/haftanin-kisa-filmi.png'});
  }

}
