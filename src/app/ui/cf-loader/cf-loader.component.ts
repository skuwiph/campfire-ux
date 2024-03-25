import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cf-loader',
    template: `
    <div class="spinner">
        <ng-content></ng-content>
        <img src="assets/img/stopwatch.svg" class="{{size}}">
    </div>`,
    styles: [`
    .spinner {
      margin: 0 auto;
      text-align: center;
    }
    img {
        &.sm {
            width: 33px;
            text-align: center;
            margin: 0 auto 1em;
        }
        &.lg {
            width: 66px;
            text-align: center;
            margin: 0 auto 1.5em;
        }
    }
    `
    ]
})
export class CfLoaderComponent {
    @Input() size = 'lg';
}
