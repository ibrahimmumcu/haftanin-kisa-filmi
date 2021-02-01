import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedComponent } from './featured.component';
import { SafePipe } from '../../pipes/safe.pipe';

@NgModule({
  declarations: [FeaturedComponent, SafePipe],
  imports: [
    CommonModule
  ],
  exports: [FeaturedComponent],
})
export class FeaturedModule { }
