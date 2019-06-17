import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { MapComponent } from './component/google.map/map.component';
import { LeafletComponent } from './component/leaflet.map/leaflet.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';

import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    // MapComponent,
    LeafletComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    LeafletModule.forRoot(),
    LeafletMarkerClusterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
