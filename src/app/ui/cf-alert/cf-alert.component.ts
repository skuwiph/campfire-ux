import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cf-alert',
  templateUrl: './cf-alert.component.html',
  styleUrls: ['./cf-alert.component.scss']
})
export class CfAlertComponent {
    @Input() type = CFAlertType.Information;
    @Input() heading = '';
}

export enum CFAlertType {
    Information = 'info',
    Warning = 'warning',
    Error = 'error',
}
