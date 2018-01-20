import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cdy-card-header-toolbar',
  templateUrl: './component.html',
  styleUrls: [ './component.scss' ],
})
export class CardHeaderToolbarComponent implements OnInit {

  @Input()
  color: string = 'primary';

  constructor() { }

  ngOnInit() {
  }

}
