import { Pipe, PipeTransform, Sanitizer, SecurityContext } from '@angular/core';

@Pipe({
    name: 'boldText'
})
export class BoldTextPipe implements PipeTransform {
    transform(textValue: string, subTextValue: string): string {
        return textValue.replace(new RegExp(`(${subTextValue})`, 'gi'), '<b>$1</b>');
    }
}