import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { Film } from '../../interfaces/film.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  films$: Observable<Film[]>;

  constructor(private appService: AppService) {
    this.films$ = this.appService.getAll(1, 'latest');
  }
}
