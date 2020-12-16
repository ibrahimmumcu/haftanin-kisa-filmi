import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutesModule } from './home.routes';
import { FilmCardModule } from '../../components/film-card/film-card.module';
import { SkeletonModule } from '../../components/skeleton/skeleton.module';
import { FeaturedModule } from '../../components/featured/featured.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutesModule,
    FilmCardModule,
    SkeletonModule,
    FeaturedModule,
  ]
})
export class HomeModule { }
