import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {

  transform(value: string, searchText: string): string {
    if (!searchText) {
      return value; // No highlighting if search text is empty
    }
    const regex = new RegExp(searchText, 'gi'); // Case-insensitive search
    return value.replace(regex, (match) => `<span class="!text-primary">${match}</span>`);
  }

}
