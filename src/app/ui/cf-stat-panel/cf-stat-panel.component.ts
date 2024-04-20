import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-cf-stat-panel',
    templateUrl: './cf-stat-panel.component.html',
    styleUrls: ['./cf-stat-panel.component.scss']
})
export class CfStatPanelComponent {
    @Input() label = '';
    @Input() value = '';
    @Input() style = CFStatPanelStyle.Information;
}

export enum CFStatPanelStyle {
    Information = "info",
    Todo = "todo",
    Warning = "warn"
}