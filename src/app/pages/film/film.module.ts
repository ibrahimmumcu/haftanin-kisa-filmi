import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmComponent } from './film.component';
import { FilmRoutesModule } from './film.routes';

@NgModule({
  declarations: [
    FilmComponent,
  ],
  imports: [
    CommonModule,
    FilmRoutesModule,
  ]
})
export class FilmModule { }
