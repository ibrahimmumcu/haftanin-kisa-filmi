import { DOCUMENT } from '@angular/common';
import { Component, HostBinding, HostListener, Inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() isMoviePage: boolean;

  scrolledClass = '';

  @HostBinding('class') get class() {
    return this.scrolledClass;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.document.body.scrollTop > 0 || this.document.documentElement.scrollTop > 0) {
      this.scrolledClass = 'scrolled';
    } else {
      this.scrolledClass = '';
    }
  }

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {}
}
