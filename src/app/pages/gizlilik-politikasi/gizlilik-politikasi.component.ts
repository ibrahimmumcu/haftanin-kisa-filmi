import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gizlilik-politikasi',
  templateUrl: './gizlilik-politikasi.component.html',
})
export class GizlilikPolitikasiComponent {
  constructor(private titleService: Title, private metaService: Meta, private router: Router) {
    this.setMeta();
  }

  private setMeta() {
    const title = 'Haftanın Kısa Filmi: Filmler';
    this.titleService.setTitle(title);
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ name: 'twitter:text:title', content: title });
    this.metaService.updateTag({ name: 'description', content: 'En iyi kısa filmleri izle.' });
    this.metaService.updateTag({ property: 'og:description', content: 'En iyi kısa filmleri izle.' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://haftaninkisafilmi.com' + this.router.url });
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
