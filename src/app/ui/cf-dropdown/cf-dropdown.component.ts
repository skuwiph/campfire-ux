import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cf-dropdown',
  templateUrl: './cf-dropdown.component.html',
  styleUrls: ['./cf-dropdown.component.scss']
})
export class CfDropdownComponent {
    @Input() options!: CFDropdownOptions;
    @Output() dropdownSelected: EventEmitter<CFDropdownItem> = new EventEmitter();
    DropdownType = CFDropdownItemType;

    onClick(item: CFDropdownItem): void {
        if(!item.disabled) {
            this.dropdownSelected.emit(item);
        }
    }
}

export interface CFDropdownOptions {
    text?: string;
    imageClass?: string;
    showIndicator: boolean;
    leftMargin?: string;
    items: CFDropdownItem[];
}

export interface CFDropdownItem {
    type: CFDropdownItemType;
    imageClass?: string;
    text?: string;
    link?: string; // item name or routerLink
    disabled?: boolean;
}

export enum CFDropdownItemType {
    TextOnly,
    ImageAndText,
    Separator
}