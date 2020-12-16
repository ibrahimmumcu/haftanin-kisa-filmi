import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FilmlerComponent } from './filmler.component';

export const routes: Routes = [
  {
    path: '',
    component: FilmlerComponent,
  },
  {
    path: ':sortBy',
    component: FilmlerComponent,
  }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forChild(routes) ]
})
export class FilmlerRoutesModule {}
