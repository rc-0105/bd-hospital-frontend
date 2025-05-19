// filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    
    return items.filter(item => 
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }
}