import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-cf-user-profile-stack',
  templateUrl: './cf-user-profile-stack.component.html',
  styleUrls: ['./cf-user-profile-stack.component.scss']
})
export class CfUserProfileStackComponent implements OnChanges {
    @Input() urlOrInitials: string[] = [];
    @Input() width = 60;
    @Input() height = 60;

    stackHeight = `66px`;
    userStack: ICFUserStack[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if(changes["urlOrInitials"]) {
            // console.log(`Got width and height: ${this.width} x ${this.height}`);
            this.calculateStackPositions();
        }
        if(changes["height"]) {
            this.stackHeight = `${this.height * 1.2}px`;
        }
    }

    calculateStackPositions(): void {
        this.userStack = [];
        var leftPos = 0;
        var zindex = 1;
        this.urlOrInitials.forEach( i => {
            this.userStack.push( { urlOrInitial: i, left: `${leftPos}px`, zindex: zindex});
            leftPos += this.width * 0.75;
            zindex += 1;
        });
        console.log(`Got list: ${JSON.stringify(this.userStack, null, 2)}`);
    }
}

export interface ICFUserStack {
    urlOrInitial: string;
    left: string;
    zindex: number;
}
