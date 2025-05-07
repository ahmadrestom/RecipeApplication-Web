import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';
    try {
      return formatDistanceToNow(new Date(value), { addSuffix: true });
    } catch (e) {
      console.error('Invalid date in timeAgo pipe:', value);
      return '';
    }
  }

}

