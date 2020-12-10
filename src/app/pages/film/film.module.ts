import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmComponent } from './film.component';
import { FilmRoutesModule } from './film.routes';
import { FeaturedModule } from 'src/app/components/featured/featured.module';
import { FilmCardModule } from 'src/app/components/film-card/film-card.module';

@NgModule({
  declarations: [
    FilmComponent,
  ],
  imports: [
    CommonModule,
    FilmRoutesModule,
    FeaturedModule,
    FilmCardModule,
  ]
})
export class FilmModule { }
