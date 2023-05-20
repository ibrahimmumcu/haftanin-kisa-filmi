import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Film } from '../../interfaces/film.interface';
import { Meta, Title } from '@angular/platform-browser';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  films: Film[];

  constructor(private titleService: Title, private metaService: Meta, private store: Store) {
    this.setMeta();
  }

  ngOnInit(): void {
    this.store
      .select(state => state.film.list)
      .pipe(untilDestroyed(this))
      .subscribe((films: Film[]) => {
        this.films = films;
      });
  }

  private setMeta() {
    const title = 'Haftanın Kısa Filmi';
    this.titleService.setTitle(title);
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ name: 'twitter:text:title', content: title });
    this.metaService.updateTag({ name: 'description', content: 'En iyi kısa filmleri izle.' });
    this.metaService.updateTag({ property: 'og:description', content: 'En iyi kısa filmleri izle.' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://haftaninkisafilmi.com' });
    this.metaService.updateTag({
      property: 'og:image',
      content: 'https://haftaninkisafilmi.com/assets/img/haftanin-kisa-filmi.png',
    });
    this.metaService.updateTag({
      property: 'og:image:secure_url',
      content: 'https://haftaninkisafilmi.com/assets/img/haftanin-kisa-filmi.png',
    });
    this.metaService.updateTag({
      name: 'twitter:image',
      content: 'https://haftaninkisafilmi.com/assets/img/haftanin-kisa-filmi.png',
    });
  }
}
