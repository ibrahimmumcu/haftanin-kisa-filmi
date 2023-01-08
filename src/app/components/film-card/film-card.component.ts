import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from '../../interfaces/film.interface';

@Component({
  selector: 'film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent {

  @HostListener('click', ['$event'])
  onClick() {
    this.router.navigate(['/film', this.film.link], { state: { film: this.film } });
  }

  @Input() film: Film;

  constructor(
    private router: Router,
  ) { }
}
