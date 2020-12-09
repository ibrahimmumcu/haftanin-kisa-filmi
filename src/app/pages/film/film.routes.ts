import { RouterModule, Routes } from '@angular/router';
import { FilmComponent } from './film.component';
import { NgModule } from '@angular/core';

export const filmRoutes: Routes = [
  {
    path: '',
    component: FilmComponent,
  },
  {
    path: ':slug',
    component: FilmComponent,
  }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forChild(filmRoutes) ]
})
export class FilmRoutesModule {}
