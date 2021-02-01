import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Film } from 'src/app/interfaces/film.interface';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  searchTerm$ = new Subject<string>();
  searchResult: Film[];
  openSearchOverlay = false;
  isSearching = false;

  constructor(
    private appService: AppService,
  ) {
    this.searchTerm$.pipe(
        filter(Boolean),
        filter((value: string) => value.length > 3),
        debounceTime(200),
        distinctUntilChanged()
      ).subscribe((searchValue: string) => {
        this.isSearching = true;
        this.appService.search(searchValue).subscribe((res) => {
        this.isSearching = false;
        this.searchResult = res;
      }, (err) => {
        this.isSearching = false;
      });
    });
  }

  search($event) {
    this.searchTerm$.next($event.target.value);
  }

}
