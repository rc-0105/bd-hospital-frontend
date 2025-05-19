import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'replaceUnderscore'
})
export class ReplaceUnderscorePipe implements PipeTransform {
    transform(value: string, replacement: string = ' '): string {
        if (typeof value !== 'string') return value;
        return value.replace(/_/g, replacement);
    }
}