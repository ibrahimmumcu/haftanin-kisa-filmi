import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmCardComponent } from './film-card.component';
@NgModule({
  declarations: [FilmCardComponent],
  imports: [
    CommonModule
  ],
  exports: [FilmCardComponent]
})
export class FilmCardModule { }
