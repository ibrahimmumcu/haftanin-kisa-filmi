import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FilmCardComponent } from './film-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FilmCardComponent],
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  exports: [FilmCardComponent],
})
export class FilmCardModule {}
