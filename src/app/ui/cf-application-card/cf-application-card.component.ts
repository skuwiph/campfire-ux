import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cf-application-card',
  templateUrl: './cf-application-card.component.html',
  styleUrls: ['./cf-application-card.component.scss']
})
export class CfApplicationCardComponent {
    @Input() title = 'Card Title';
}
