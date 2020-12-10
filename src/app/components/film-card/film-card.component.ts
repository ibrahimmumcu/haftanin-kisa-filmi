import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from '../../interfaces/film.interface';

@Component({
  selector: 'film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {

  @HostListener('click', ['$event'])
  onClick(e) {
    this.router.navigate(['/film', this.film.link]);
  }

  @Input() film: Film;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log(this.film)
  }

}
