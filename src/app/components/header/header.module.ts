import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { FilmCardModule } from '../film-card/film-card.module';
import { SkeletonModule } from '../skeleton/skeleton.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    FilmCardModule,
    SkeletonModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule { }
