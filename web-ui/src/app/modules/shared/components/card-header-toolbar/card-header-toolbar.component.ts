import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cdy-card-header-toolbar',
  templateUrl: './card-header-toolbar.component.html',
  styleUrls: [ './card-header-toolbar.component.scss' ],
})
export class CardHeaderToolbarComponent implements OnInit {

  @Input()
  color: string = 'primary';

  constructor() { }

  ngOnInit() {
  }

}
