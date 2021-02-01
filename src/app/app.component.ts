import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  
  constructor(
    private router: Router,
  ) {
    this.router.events.subscribe((event: NavigationEnd) => {
      window.scroll(0, 0);
    });
  }

}
