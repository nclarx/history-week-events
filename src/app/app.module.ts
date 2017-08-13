import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {EventService} from './event/event.service';
import {EventComponent} from './event/event.component';
import {CsvToJsonComponent} from './csv-to-json/csv-to-json.component';
import {HttpModule} from '@angular/http';
import {EventsPipe} from './event/events.pipe';
import {FormsModule} from '@angular/forms';
import {AnalyticsService} from './ga/analytics.service';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    CsvToJsonComponent,
    EventsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule
  ],
  providers: [EventService, AnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
