import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  
   formatDate(date: Date, time:boolean = true): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getFullYear()); // Get last two digits of the year
    const hours = String(date.getHours());
    const minutes = String(date.getMinutes());
    
    return time? `${day}.${month}.${year} ${hours}:${minutes}`:`${day}.${month}.${year}`;
  }
}
