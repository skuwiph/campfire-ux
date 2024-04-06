import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cf-alert',
  templateUrl: './cf-alert.component.html',
  styleUrls: ['./cf-alert.component.scss']
})
export class CfAlertComponent {
    @Input() type = CfAlertType.Information;
    @Input() heading = '';
}

export enum CfAlertType {
    Information = 'info',
    Warning = 'warning',
    Error = 'error',
}
