import { Component, ElementRef, HostBinding, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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

  @HostBinding('class') isPlayingClass = '';

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.showFilm = false;
  }

  @ViewChild('videoContainer') videoContainer: ElementRef;
  @ViewChild('checkCurtain') checkCurtain: ElementRef;

  showFilm = false;

  constructor(private sanitizer: DomSanitizer) {
    
  }

  ngOnInit(): void {
    this.setBackgroundImage();
  }


  ngOnChanges(changes: SimpleChanges) {
    if(changes?.film?.currentValue?.featuredImage) {
      this.setBackgroundImage();
      this.isPlayingClass = '';
    }
  }

  setBackgroundImage() {
    this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(
      'url('+this.film.featuredImage+')'
    );
  }

  startPlaying() {
    this.isPlayingClass = 'is-playing';

    setTimeout(() => {
      let checkboxElement: HTMLElement = this.checkCurtain.nativeElement as HTMLElement;
      checkboxElement.click();
    }, 100);
    
  }

}
