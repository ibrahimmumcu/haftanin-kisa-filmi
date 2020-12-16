import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent implements OnInit {

  @Input() type: string;

  constructor() { }

  ngOnInit(): void {
  }

}
