import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-cf-progress',
  templateUrl: './cf-progress.component.html',
  styleUrls: ['./cf-progress.component.scss']
})
export class CfProgressComponent implements OnChanges {
    @Input() label: string | undefined;
    @Input() max: number = 100;
    @Input() value: number | undefined = 50;

    ngOnChanges(changes: SimpleChanges): void {
        if(changes["value"]) {
        }
    }
}
