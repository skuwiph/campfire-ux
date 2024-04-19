import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-cf-banner',
    templateUrl: './cf-banner.component.html',
    styleUrls: ['./cf-banner.component.scss']
})
export class CfBannerComponent {
    @Input() type = CFBannerType.Information;
}

export enum CFBannerType {
    Information = "info",
    Reminder = "todo",
    Done = "done",
    Exclamation = "exclaim",
}