import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FilmStore } from 'src/app/stores/film/film.store';
import { Film } from '../../interfaces/film.interface';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @Select(FilmStore.films) films$: Observable<Film[]>;

  constructor(private titleService: Title, private metaService: Meta) {
    this.setMeta();
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
