import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cf-button',
  templateUrl: './cf-button.component.html',
  styleUrls: ['./cf-button.component.scss']
})
export class CfButtonComponent {
    @Input() type = CfButtonType.Primary;
    @Input() enabled = true;
    @Output() click: EventEmitter<Event> = new EventEmitter<Event>();

    getClass() {
        return {
            btn: true,
            'primary': this.type.toLowerCase() == "primary",
            'secondary': this.type.toLowerCase() == "secondary",
            'tertiary': this.type.toLowerCase() == "tertiary",
            'default': this.type.toLowerCase() == "default",
            'danger': this.type.toLowerCase() == "danger",
            'cancel': this.type.toLowerCase() == "cancel",
            'disabled': !this.enabled,
        };
    }

    onClick(event: Event): void {
        this.click.emit(event);
        event.stopPropagation(); // Important - stop double event
    }
}

export enum CfButtonType {
    Primary = "Primary",
    Secondary = "Secondary",
    Tertiary = "Tertiary",
    Default = "Default",
    Cancel = "Cancel",
    Danger = "Danger",
}
