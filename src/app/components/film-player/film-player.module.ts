import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmPlayerComponent } from './film-player.component';
import { SafePipe } from '../../pipes/safe.pipe';

@NgModule({
  declarations: [FilmPlayerComponent, SafePipe],
  imports: [CommonModule],
  exports: [FilmPlayerComponent],
})
export class FilmPlayerModule {}
