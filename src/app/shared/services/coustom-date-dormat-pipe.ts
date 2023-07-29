import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import firebase from 'firebase/compat/app';

@Pipe({
  name: 'customDateFormat',
})
export class CustomDateFormatPipe implements PipeTransform {
    transform(value: any, format: string = 'shortDate'): Date | null {
      if (value instanceof firebase.firestore.Timestamp) {
        value = value.toDate(); // Convert Firestore Timestamp to JavaScript Date
      }
  
      return value ? new Date(value) : null;
    }
  }
  