import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CFDropdownItem, CFDropdownItemType, CFDropdownOptions } from '../cf-dropdown/cf-dropdown.component';

@Component({
  selector: 'app-cf-menu',
  templateUrl: './cf-menu.component.html',
  styleUrls: ['./cf-menu.component.scss']
})
export class CfMenuComponent implements OnInit {
    @Output() menuSelected: EventEmitter<string> = new EventEmitter();

    interviewerOptions?: CFDropdownOptions;
    dropdownOptions?: CFDropdownOptions;
    userOptions?: CFDropdownOptions;

    ngOnInit(): void {
        this.interviewerOptions = {
            text: 'Interviewers', showIndicator: true, items: [
                { type: CFDropdownItemType.ImageAndText, text: 'Interviewers', link: 'interviewer', imageClass: 'fa-solid fa-people-group' },
                { type: CFDropdownItemType.ImageAndText, text: 'Summary', link: 'interviewer/summary', imageClass: 'fa-solid fa-list-check' },
            ]
        };
        this.dropdownOptions = {
            text: '', imageClass:'fa-solid fa-user-gear', showIndicator: true, items: [
                { type: CFDropdownItemType.ImageAndText, text: 'Users', link: 'maintain/user', imageClass: 'fa-solid fa-circle-user' },
                { type: CFDropdownItemType.Separator },
                { type: CFDropdownItemType.ImageAndText, text: 'Countries', link: 'maintain/country', imageClass: 'fa-solid fa-book-atlas' },
                { type: CFDropdownItemType.ImageAndText, text: 'Flights', link: 'maintain/flight', imageClass: 'fa-solid fa-plane', disabled: true },
            ]
        };
        this.userOptions = {
            imageClass:'fa-solid fa-circle-user', 
            showIndicator: false, 
            leftMargin: '-12rem',
            items: [
                { type: CFDropdownItemType.ImageAndText, text: 'Profile', link: 'profile', imageClass: 'fa-solid fa-id-card' },
                { type: CFDropdownItemType.Separator },
                { type: CFDropdownItemType.ImageAndText, text: 'Messages', link: 'messages', imageClass: 'fa-regular fa-envelope' },
                { type: CFDropdownItemType.Separator },
                { type: CFDropdownItemType.ImageAndText, text: 'Sign out', link: 'sign-out', imageClass: 'fa-solid fa-right-from-bracket' },
            ]
        };
    }

    itemSelected(link: string): void {
        this.menuSelected.emit(link);
    }

    dropdownSelected(item: CFDropdownItem): void {
        this.menuSelected.emit(item.link);
    }
}

