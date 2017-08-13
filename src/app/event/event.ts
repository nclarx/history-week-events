export interface IEvent {
  title: string;
  date: string;
  host: string;
  location: string;
  region: string;
  blurb: string;
  cost: string;
  bookingUrl: string;
  moreInfoUrl: string;
  featureImageUrl: string;
  startTime: string;
  endTime: string;
  dayOfWeek: string;
  featuredEvent: string;
}

export class Event implements IEvent {
  constructor(public title: string,
              public date: string,
              public host: string,
              public location: string,
              public region: string,
              public blurb: string,
              public cost: string,
              public bookingUrl: string,
              public moreInfoUrl: string,
              public featureImageUrl: string,
              public startTime: string,
              public endTime: string,
              public dayOfWeek: string,
              public featuredEvent: string
              ) {
  }
}
