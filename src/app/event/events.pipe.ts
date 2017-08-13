import {Pipe, PipeTransform} from '@angular/core';
import {IEvent} from './event';
import * as moment from 'moment/moment';

@Pipe({
  name: 'EventsPipe'
})
export class EventsPipe implements PipeTransform {

  transform(value: any, // The array of event items
            regionSelected: string,
            sortField: keyof IEvent,
            sortDirection: boolean,
            showFeaturedEvents: boolean): any {
    if (!value) { // Null checking which returns false when there are no values, required or Angular throws an error
      return value;
    }

    // console.log(regionSelected, dayOfWeekSelected, sortField, sortDirection, value); // Useful for debugging pipe

    value = EventFilter(value, regionSelected, showFeaturedEvents); // Call to EventFilter function to filter events
    value = EventSort(value, sortField, sortDirection); // Call to EventSort function to sort events

    return value; // Returns the filtered and sorted list of events
  }
}

export const EventFilter: (value: IEvent[], region: string, showFeaturedEvents: boolean) => IEvent[] = function (value: IEvent[], region: string, showFeaturedEvents: boolean) {
  return value.filter(event => {
    let today = moment();
    let eventDate = moment(event.date, 'YYYY-MM-DD');
    if (eventDate.isAfter(today)) { // Check if event is after today's date - events that have past are filtered out
      if (region !== null) { // Null checking, if region equals null then all events are returned
        if (showFeaturedEvents === true) { //Filters by featured event and region
          return event.featuredEvent === 'TRUE' && event.region === region;
        } else {
          return event.region === region;
        }
      } else { // Filters by featured event when region is null
        if(showFeaturedEvents === true){
          return event.featuredEvent === 'TRUE'
        } else {
          return true;
        }
      }
    }
  });
};

const EventSort: (value: IEvent[], eventSort: keyof IEvent, sortDirection: boolean) => IEvent[] =
  function (value: IEvent[], eventSort: keyof IEvent, sortDirection: boolean) {
    return value.sort((a, b) => { //Sort function which allows you to sort the list by a property of an object.
      if (a[eventSort] < b[eventSort]) {
        return sortDirection ? -1 : 1;
      }
      if (a[eventSort] > b[eventSort]) {
        return sortDirection ? 1 : -1;
      }
      return 0;
    });
  };
