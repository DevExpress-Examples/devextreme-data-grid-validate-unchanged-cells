import { Component, ViewChild, AfterViewChecked } from '@angular/core';
import { DxDataGridComponent, DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import notify from 'devextreme/ui/notify';
import { Customer, Service } from './app.service';
import { DetailViewComponent } from './detail-view/detail-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Service],
})
export class AppComponent implements AfterViewChecked {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent | undefined;

  checked = false;

  changes: DxDataGridTypes.DataChange[] = [];

  pattern = /^\(\d{3}\) \d{3}-\d{4}$/i;

  customers: Customer[];

  constructor(service: Service) {
    this.customers = service.getCustomers();
    this.validateVisibleRows = this.validateVisibleRows.bind(this);
  }

  validateVisibleRows(): void {
    const dataGridInstance = this?.dataGrid?.instance;
    dataGridInstance?.expandAll(-1);
    const fakeChanges = dataGridInstance ? dataGridInstance.getVisibleRows().map((row: DxDataGridTypes.Row): DxDataGridTypes.DataChange => ({ type: 'update', key: row.key, data: {} })) : [];
    this.changes = [...this.changes, ...fakeChanges];
    this.checked = true;
  }

  ngAfterViewChecked(): void {
    if (this.changes.length && this.checked) {
      this.checked = false;
      const dataGridInstance = this?.dataGrid?.instance;
      dataGridInstance?.repaint();
      // @ts-expect-error - getController is a private method
      dataGridInstance?.getController('validating')
        .validate(true)
        .then((result: Boolean) => {
          const message = result ? 'Validation is passed' : 'Validation is failed';
          const type = result ? 'success' : 'error';
          notify({
            message,
            type,
            position: {
              offset: '0 50',
              at: 'bottom',
              of: '.demo-container',
            },
          });
        });
    }
  }

  private validationInProgress: boolean = false;

  detailView_OnContentReady(e: any, locationDetail: any): void {
    //This avoid the loop caused by repaint call
    if (this.validationInProgress == true) {
      return;
    }

    this.validationInProgress = true;
    let detailGridInstance = e.component; 
    const detailGridFakeChanges = detailGridInstance ? detailGridInstance.getVisibleRows().map((row: DxDataGridTypes.Row): DxDataGridTypes.DataChange => ({ type: 'update', key: row.key, data: {} })): [];
    locationDetail.dxDataGrid.editing.changes = [...locationDetail.dxDataGrid.editing.changes, ...detailGridFakeChanges];
    
    //This would cause a loop
    detailGridInstance?.repaint();
    
    let gridController = detailGridInstance?.getController('validating')
    gridController.validate(true).then ((result: boolean) => {
      console.log("Validation result: " + result);
    });

    this.validationInProgress = false;
  }
}
