import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmlerComponent } from './filmler.component';
import { FilmlerRoutesModule } from './filmler.routes';
import { FilmCardModule } from 'src/app/components/film-card/film-card.module';
import { SkeletonModule } from 'src/app/components/skeleton/skeleton.module';

@NgModule({
  declarations: [FilmlerComponent],
  imports: [
    CommonModule,
    FilmlerRoutesModule,
    FilmCardModule,
    SkeletonModule,
  ]
})
export class FilmlerModule { }
