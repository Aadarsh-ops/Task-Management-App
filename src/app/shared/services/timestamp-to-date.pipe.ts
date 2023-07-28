import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase/compat/app';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {
  transform(value: firebase.firestore.Timestamp | Date): Date {
    if (value instanceof Date) {
      return value; // If it's already a Date object, return it as is
    } else if (value instanceof firebase.firestore.Timestamp) {
      return value.toDate(); // If it's a Timestamp object, convert it to Date
    } else {
      throw new Error('Invalid value. Expected Date or Timestamp object.');
    }
  }
}
