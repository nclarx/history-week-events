import {Component, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {AngularFireDatabase} from 'angularfire2/database';
import {Event} from '../event/event';

@Component({
  selector: 'app-csv-to-json',
  templateUrl: './csv-to-json.component.html',
  styleUrls: ['./csv-to-json.component.scss']
})
export class CsvToJsonComponent implements OnInit {

  csvUrl: string;
  data;

  constructor(private http: Http, private af: AngularFireDatabase) {
  }

  ngOnInit() {

  }

  private nullCheck(value: string): string {
    if (
      value === undefined ||
      value === null ||
      typeof value === 'undefined' ||
      value === ''
    ) {
      console.log('blank');
      return 'blank';
    } else {
      console.log('value before regex', value);
      value = value.replace(/^\"|\"$/g, '');
      console.log('value after regex', value);
      return value;
    }
  }

  readData() {
    this.csvUrl = './assets/events.csv'; // Path to the csv file
    this.http.get(this.csvUrl).subscribe( // Subscribe to the CSV using the Angular Http Module
      data => {
        if (data) {
          this.extractData(data); // When data arrives send it to the extractData
        }
      },
      error => this.handleError
    );
  }

  private extractData(res: Response) {
    console.log(res);
    this.data = res;
    const csvData = res['_body'] || '';
    let allTextLines = csvData.split(/\r\n|\n/);
    // console.log(allTextLines);
    let headers = allTextLines[0].split(',');
    // console.log('headers:', headers);
    // console.log('lines: ', allTextLines);
    let lines = [];

    for (let i = 1; i < allTextLines.length; i++) {

      let data = allTextLines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g); //Split each property of an event into its own array
      console.log('Matched Data: ', data);


        let title = this.nullCheck(data[0]),
        date = this.nullCheck(data[1]),
        host = this.nullCheck(data[2]),
        location = this.nullCheck(data[3]),
        region = this.nullCheck(data[4]),
        blurb = this.nullCheck(data[5]),
        cost = this.nullCheck(data[6]),
        bookingUrl = this.nullCheck(data[7]),
        moreInfoUrl = this.nullCheck(data[8]),
        featureImageUrl = this.nullCheck(data[9]),
        startTime = this.nullCheck(data[10]),
        endTime = this.nullCheck(data[11]),
        dayOfWeek = this.nullCheck(data[12]),
        featuredEvent = this.nullCheck(data[13]);
        // This declaration matches array items with the correct property in
        // the Event Class.

      let event = new Event(
        title,
        date,
        host,
        location,
        region,
        blurb,
        cost,
        bookingUrl,
        moreInfoUrl,
        featureImageUrl,
        startTime,
        endTime,
        dayOfWeek,
        featuredEvent
      );
      console.log('Event Obj: ', event);
      this.af.list('events').push(event).then((success) => {
        // console.log(success);
      }, (error) => {
        console.error('Event throwing error: ', event);
        console.error('Firebase error: ', error);
      });
    }
  }

  handleError(error: any) {
    console.error(error);
  }

}
