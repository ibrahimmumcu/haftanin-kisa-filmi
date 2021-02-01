import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GizlilikPolitikasiComponent } from './gizlilik-politikasi.component';
import { GizlilikPolitikasiRoutesModule } from './gizlilik-politikasi.routes';

@NgModule({
  declarations: [GizlilikPolitikasiComponent],
  imports: [
    CommonModule,
    GizlilikPolitikasiRoutesModule
  ]
})
export class GizlilikPolitikasiModule { }
