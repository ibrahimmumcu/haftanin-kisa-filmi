import { Component, ElementRef, HostBinding, HostListener, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Film } from '../../interfaces/film.interface';

@Component({
  selector: 'featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit, OnChanges {

  @Input() film: Film;
  @Input() isFeatured: boolean;

  @HostBinding('style.background-image')
  backgroundImage: SafeStyle;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.showFilm = false;
  }

  @ViewChild('videoContainer') videoContainer: ElementRef;

  showFilm = false;

  constructor(private sanitizer: DomSanitizer) {
    
  }

  ngOnInit(): void {
    this.setBackgroundImage();
  }


  ngOnChanges(changes: SimpleChanges) {
    if(changes?.film?.currentValue?.featuredImage) {
      this.setBackgroundImage();
    }
  }

  setBackgroundImage() {
    this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(
      'url('+this.film.featuredImage+')'
    );
  }

}
