import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'film',
    loadChildren: () => import('./pages/film/film.module').then(m => m.FilmModule),
  },
  {
    path: 'gizlilik-politikasi',
    loadChildren: () => import('./pages/gizlilik-politikasi/gizlilik-politikasi.module').then(m => m.GizlilikPolitikasiModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
