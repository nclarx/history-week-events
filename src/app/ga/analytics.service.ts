import {Injectable} from '@angular/core';
import 'autotrack/autotrack.js';

@Injectable()
export class AnalyticsService {
  constructor() {
    (<any>window).ga = (<any>window).ga || function () {
      ((<any>window).ga.q = (<any>window).ga.q || []).push(arguments);
    };
    (<any>window).ga.l = +new Date;
    (<any>window).ga('create', 'UA-34342096-2', 'auto');
    (<any>window).ga('require', 'cleanUrlTracker');
    (<any>window).ga('require', 'eventTracker');
    (<any>window).ga('require', 'outboundLinkTracker');
    (<any>window).ga('require', 'urlChangeTracker');
  }

  pageView(url: string) {
    (<any>window).ga('set', 'page', url);
    (<any>window).ga('send', 'pageview');
  }

  registerEvent(eventCategory: string, eventTitle, eventReference?: string){
    if(eventReference){
      (<any>window).ga('send', 'event', eventCategory, eventTitle, eventReference);
    } else {
      (<any>window).ga('send', 'event', eventCategory, eventTitle);
    }
  }
}

