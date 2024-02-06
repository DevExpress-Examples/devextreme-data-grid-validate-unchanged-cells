import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailViewComponent } from './detail-view/detail-view.component';

@NgModule({
  declarations: [AppComponent, DetailViewComponent],
  imports: [BrowserModule, AppRoutingModule, DxDataGridModule, DxButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
