import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { WebBluetoothModule } from '@manekinekko/angular-web-bluetooth';


import { AppComponent } from './app.component';
import { DisplayMiBandStatsComponent } from './digital/display-mi-band-stats.component';
import { ArDisplayMiBandComponent } from './ar/ar-display-mi-band.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DisplayMiBandStatsComponent,
    ArDisplayMiBandComponent
  ],
  imports: [
    BrowserModule,
    WebBluetoothModule.forRoot({
      //Cannot be made false. GitHub issue: https://github.com/manekinekko/angular-web-bluetooth/issues/41
      enableTracing: true 
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
