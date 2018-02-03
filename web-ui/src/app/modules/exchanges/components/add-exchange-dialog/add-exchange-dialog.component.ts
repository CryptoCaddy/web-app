import { OnInit, Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { AddExchangeFormComponent } from '../add-exchange-form/add-exchange-form.component';

@Component({
  selector: 'cdy-add-exchange-dialog',
  templateUrl: './add-exchange-dialog.component.html',
  styleUrls: [ './add-exchange-dialog.component.scss' ],
})
export class AddExchangeDialogComponent implements OnInit {

  @ViewChild('addExchange')
  private addExchange: AddExchangeFormComponent;

  constructor(private dialogRef: MatDialogRef<AddExchangeDialogComponent>) { }

  public ngOnInit() {
    this.addExchange.completed$.subscribe((value) => {
      if (value) {
        this.dialogRef.close();
      }
    });
  }

}
