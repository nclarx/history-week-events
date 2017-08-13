import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AnalyticsService} from './ga/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title: string;
  regions$: FirebaseListObservable<string[]>;

  regionSelected: string;
  sortDirectionSelected: boolean;
  showFeaturedEvents: boolean;

  constructor(private af: AngularFireDatabase, private AnalyticsService: AnalyticsService) {
    this.title = 'History Week 2017';
  }

  ngOnInit(): void {

    //Defaults for Pipe
    this.regionSelected = null; // null value shows events from all regions
    this.sortDirectionSelected = true; // default earliest to latest
    this.showFeaturedEvents = false;

    this.regions$ = this.af.list('regions'); // Using AngularFire2 to call list of regions for dropdown
    this.AnalyticsService.pageView('events'); // Send page view to Google Analytics
  }

  registerClick(buttonType: string, eventTitle: string): void {
    this.AnalyticsService.registerEvent(buttonType, eventTitle); // Send button click to Google Analytics
  }

  registerFilterChange(eventType: string, event: string): void {
    this.AnalyticsService.registerEvent(eventType, event); // Send filter changes to Google Analytics
  }

  clearRegionFilter(): void {
    this.regionSelected = null;
    this.AnalyticsService.registerEvent('Region Filter', 'filter cleared');
  }

  toggleSortDirection(): void {
    this.sortDirectionSelected = !this.sortDirectionSelected;
    this.AnalyticsService.registerEvent('Sort Direction', this.sortDirectionSelected.toString()); // Send sort direction changes to Google Analytics
  }

  toggleFeaturedEvents(): void {
    this.showFeaturedEvents = !this.showFeaturedEvents;
    this.AnalyticsService.registerEvent('Feature Events', this.showFeaturedEvents.toString()); // Send feature events filter changes to Google Analytics
  }

}
