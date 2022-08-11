import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NbMenuModule, NbThemeModule } from '@nebular/theme';
import { UiModule } from './common/ui.module';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NbThemeModule.forRoot({ name: 'default' }),
    UiModule,
    NbMenuModule.forRoot(),


    // FontAwesomeModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
