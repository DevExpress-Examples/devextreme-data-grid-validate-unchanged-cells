import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';

@Component({
  selector: 'detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
})
export class DetailViewComponent {
  @Input() key!: object;

  @Input() rowData: [] = [];

  @Output() onContentReady = new EventEmitter<any>();
  
  @ViewChild(DxDataGridComponent, { static: true}) dxDataGrid! : DxDataGridComponent;

  public columnsConfig: any[] = [];

  constructor() {
    this.buildColumnsConfig();
  }
  
  private buildColumnsConfig() {
    let cols = [
      {
        dataField: "Address",
        dataType: "string",
        caption: "Address",
        allowEditing: true,
        validationRules: [
          {type: 'required'},
        ]
      },
      {
        dataField: "City",
        dataType: "string",
        caption: "City",
      },
      {
        dataField: "Region",
        dataType: "string",
        caption: "Region",
        validationRules: [
          {
            type: 'custom',
            name: 'CustomValidation',
            message: 'Custom validation failed',
            validationCallback: (params: any) => {
              console.log("Custom validation");
              return params.value == "Arkansas";
            }
          }
        ]
      },
      {
        dataField: "PostalCode",
        dataType: "string",
        caption: "PostalCode",
      },
      {
        dataField: "Country",
        dataType: "string",
        caption: "Country",
      },
      {
        dataField: "Phone",
        dataType: "string",
        caption: "Phone",
      },
    ];

    this.columnsConfig = cols;
  }

  dataGrid_OnContentReady(e: any) {
    this.onContentReady.emit(e);
  }
}
