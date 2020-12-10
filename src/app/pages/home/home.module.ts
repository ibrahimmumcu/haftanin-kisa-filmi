import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutesModule } from './home.routes';
import { FilmCardModule } from '../../components/film-card/film-card.module';
import { SliderModule } from '../../components/slider/slider.module';
import { FeaturedModule } from '../../components/featured/featured.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutesModule,
    FilmCardModule,
    SliderModule,
    FeaturedModule,
  ]
})
export class HomeModule { }
