import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cf-user-target',
  templateUrl: './cf-user-target.component.html',
  styleUrls: ['./cf-user-target.component.scss']
})
export class CfUserTargetComponent {
    @Input() label = '';
    @Input() value = 0;
}
