import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './mobile-device-layout.component.html',
    styleUrls: ['./mobile-device-layout.component.scss']
})
export class MobileDeviceLayoutComponent implements OnInit {
    ngOnInit(): void {
        
    }

    menuItemSelected(link: string): void {
        console.log(`Selected: ${link}`);
    }
}