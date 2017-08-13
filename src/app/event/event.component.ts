import {Component, Input, OnInit} from '@angular/core';
import {FirebaseListObservable} from 'angularfire2/database';
import * as moment from 'moment/moment';

import {EventService} from './event.service';
import {IEvent} from './event';
import {AnalyticsService} from '../ga/analytics.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})

export class EventComponent implements OnInit {

  events$: FirebaseListObservable<IEvent[]>;
  sortField: string;

  @Input() regionSelected: string; // Argument for EventsPipe used in *ngFor in the template
  @Input() sortDirection: boolean; // ^^^   ^^^   ^^^  ^^^  ^^^   ^^^   ^^^   ^^^   ^^^   ^^^
  @Input() showFeaturedEvents: boolean; // ^^^   ^^^   ^^^  ^^^  ^^^   ^^^   ^^^   ^^^   ^^^

  constructor(public EventService: EventService, private AnalyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.sortField = 'date'; // Argument for EventsPipe sort
    this.events$ = this.EventService.getEvents(); // Get list of events using AngularFire2
  }

  registerClick(eventCategory: string, buttonType: string, eventTitle: string): void {
    this.AnalyticsService.registerEvent(eventCategory, buttonType, eventTitle); // Send button clicks to Google Analytics
  }
}
