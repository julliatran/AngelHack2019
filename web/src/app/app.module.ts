import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {DataTableModule} from "angular2-datatable";

import { AppComponent }  from './app.component';
import { MapComponent } from './component/map/map.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, DataTableModule ],
  declarations: [ AppComponent, MapComponent ],
  bootstrap:    [ AppComponent, MapComponent ]
})
export class AppModule { }
