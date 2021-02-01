import { Component, ElementRef, HostBinding, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
  @HostBinding('style.background-image') backgroundImage: SafeStyle;
  @HostBinding('class') isPlayingClass = '';
  @ViewChild('videoContainer') videoContainer: ElementRef;
  @ViewChild('checkCurtain') checkCurtain: ElementRef;

  constructor(private sanitizer: DomSanitizer) {
    
  }

  ngOnInit(): void {
    this.setBackgroundImage();
  }


  ngOnChanges(changes: SimpleChanges) {
    if(changes?.film?.currentValue?.featuredImage) {
      this.setBackgroundImage();
      this.addAutoPlayToIframe();
      this.isPlayingClass = '';
    }
  }

  setBackgroundImage() {
    this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(
      'url('+this.film?.featuredImage+')'
    );
  }

  startPlaying() {
    this.isPlayingClass = 'is-playing';

    setTimeout(() => {
      let checkboxElement: HTMLElement = this.checkCurtain.nativeElement as HTMLElement;
      checkboxElement.click();
    }, 500);
  }

  addAutoPlayToIframe() {
    const parser = new DOMParser();
    var parsedIframe = parser.parseFromString(this.film.videoEmbed, "text/html");
    let iframe = parsedIframe.getElementsByTagName("iframe");
    let src = iframe[0].src;
    const paramMergerChar = src.indexOf('?') > -1 ? '&' : '?'; 
    this.film.videoEmbed = this.film.videoEmbed.replace(src, src + paramMergerChar + 'autoplay=1');

    const allowAttr = iframe[0].allow;
    if(allowAttr.length === 0) {
      this.film.videoEmbed = this.film.videoEmbed.replace('></iframe>', ' allow="autoplay; fullscreen"></iframe>');
    }
  }

}
