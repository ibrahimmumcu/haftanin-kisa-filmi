import { RouterModule, Routes } from '@angular/router';
import { GizlilikPolitikasiComponent } from './gizlilik-politikasi.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: GizlilikPolitikasiComponent,
  }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forChild(routes) ]
})
export class GizlilikPolitikasiRoutesModule {}
