import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmComponent } from './film.component';
import { FilmRoutesModule } from './film.routes';
import { FilmPlayerModule } from 'src/app/components/film-player/film-player.module';
import { FilmCardModule } from 'src/app/components/film-card/film-card.module';
import { SkeletonModule } from 'src/app/components/skeleton/skeleton.module';

@NgModule({
  declarations: [FilmComponent],
  imports: [CommonModule, FilmRoutesModule, FilmPlayerModule, FilmCardModule, SkeletonModule],
})
export class FilmModule {}
