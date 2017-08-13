import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {IEvent} from './event';

@Injectable()
export class EventService {

  constructor(private af: AngularFireDatabase) {
  }

  public getEvents(): FirebaseListObservable<IEvent[]> {
    return this.af.list('events', { // Returns an AngularFire Observable list to the component
      query: {
        orderByChild: 'date'
        // Even though the EventsPipe in the component sorts by the date property by default - I include this because
        // you could easily add a feature to select different sort properties - this orderByChild would ensure that if
        // no sort property was selected that the list would be ordered by date.
      }
    });
  }
}
