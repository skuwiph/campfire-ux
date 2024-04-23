import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cf-dropdown',
  templateUrl: './cf-dropdown.component.html',
  styleUrls: ['./cf-dropdown.component.scss']
})
export class CfDropdownComponent {
    @Input() options!: CFDropdownOptions;
    @Output() dropdownSelected: EventEmitter<CFDropdownItem> = new EventEmitter();
    @Output() parentSelected = new EventEmitter();
    DropdownType = CFDropdownItemType;
    displayChild = false;

    onClickParent(): void {
        if(!this.options.disabled) {
            this.parentSelected.emit();
            if(this.options.items) {
                console.log(`Show child`);
                this.displayChild = true;
            }
        }
    }

    onClick(item: CFDropdownItem): void {
        if(!item.disabled) {
            this.dropdownSelected.emit(item);
            this.displayChild = false;
        }
    }

    closeMenu(): void {
        this.displayChild = false;
    }
}

export interface CFDropdownOptions {
    text?: string;
    imageClass?: string;
    showIndicator: boolean;
    leftMargin?: string;
    items?: CFDropdownItem[];
    disabled?: boolean;
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