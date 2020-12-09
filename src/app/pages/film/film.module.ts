import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmComponent } from './film.component';
import { FilmRoutesModule } from './film.routes';
import { SafePipe } from 'src/app/pipes/safe.pipe';

@NgModule({
  declarations: [
    FilmComponent,
    SafePipe,
  ],
  imports: [
    CommonModule,
    FilmRoutesModule,
  ]
})
export class FilmModule { }
