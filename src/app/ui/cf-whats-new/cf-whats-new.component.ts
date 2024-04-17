import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UiService } from '../ui.service';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [CommonModule],
    templateUrl: 'cf-whats-new.component.html',
    styleUrls: ['./cf-whats-new.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CfWhatsNewComponent {
    constructor(private uiService: UiService) {}

    @Input() tourItems: CFTourElement[] = [];
    @Output() onEndTour: EventEmitter<boolean> = new EventEmitter();
    @Output() onTourItemChanged: EventEmitter<CFTourElement> = new EventEmitter();

    startTour(): void {
        this.display = true;
        this.current = 0;
        this.calculatePositions();
    }

    cancelTour(): void {
        this.display = false;
        this.onEndTour.emit(true);
    }

    calculatePositions(): void {
        const c = this.tourItems[this.current];

        this.onTourItemChanged.emit(c);

        const b = this.uiService.getElementPositionByType(c.identifier);
        if (b) {
            //console.log(`Bounds: ${JSON.stringify(b)}, window: ${window.scrollX},${window.scrollY}`);
            const x = b[0].x;
            const y = b[0].y + window.scrollY;
            const width = b[0].width;
            const height = b[0].height;
            const x1 = x + width;
            const y1 = y + height;
            console.log(`Looking at x: ${x}, ${y} -> ${width} x ${height}. Item is ${x1}px wide`);
            
            // Only scroll if the target is not on screen
            const wx = window.screenLeft;
            const wy = window.screenTop + window.scrollY;
            const ww = window.innerWidth;
            const wh = window.innerHeight;
            
            // Need to know the exact height of the 'tail' to include that in our
            // calculations
            var top = y1;
            var left = x + (width / 2) - 200;

            console.log(`Want to center on ${left}`);

            if(y < wy || y > wy + wh) {
                // console.log(`target (${y}) is off-screen: ${wx},${wy}-${ww}x${wh}`);
                window.scrollTo({ left: x, top: y, behavior: 'smooth' });
            }

            var xArrow = left;
            if (left < 15) {
                left = 15;
                this.tail = "up-left";
            } else if (left + 400 > window.innerWidth) {
                left = window.innerWidth - 400;
            }

            console.log(`Left is at : ${left}px, width of bubble is 400px`);

            this.xPos = `${left}px`;
            this.xArrowPos = `${xArrow}px`;
            this.yPos = `${top}px`;
            this.heading = c.heading;
            this.text = c.text;

            // console.log(`${left}x${top}: Item: ${this.current}, count: ${this.tourItems.length}`);

            this.hasNext = this.current < this.tourItems.length - 1;
            this.hasPrevious = this.current > 0;
            this.display = true;

        } else {
            this.cancelTour();
            console.warn(`Couldn't get element from ${c.identifier}`);
        }
    }

    // calculatePosition(): void {
    //     this.display = true;
    //     console.log(`Position: ${this.tourItem.targetX},${this.tourItem.targetY}`);
    //     // Scroll to first
    //     window.scrollTo({ left: this.tourItem.targetX, top: this.tourItem.targetY, behavior: 'smooth' })

    //     // Calculate whether the top is at the bottom of the viewport
    //     // Are we pointing up, down, left, or right
    //     console.log(`Viewport: ${window.innerWidth}x${window.innerHeight}`);
    //     const width = window.innerWidth;
    //     // const height = window.innerHeight;

    //     // Need to know the exact height of the 'tail' to include that in our
    //     // calculations
    //     var top = this.tourItem.targetY + this.tourItem.height;
    //     var left = this.tourItem.targetX - 15;
    //     var xArrow = this.tourItem.targetX + 15;
    //     if( left < 15) {
    //         left = 15;
    //     } else if(left + 400 > width) {
    //         left = width - 400;
    //     }
             
    //     this.xPos = `${left}px`;
    //     this.xArrowPos = `${xArrow}px`;
    //     this.yPos = `${top}px`;
    //     this.text = this.tourItem.text;

    //     console.log(`${left}x${top}: Item: ${this.tourItem.countInTour}, count: ${this.tourItem.totalTourItems}`);

    //     this.hasNext = this.tourItem.countInTour < this.tourItem.totalTourItems - 1;
    //     this.hasPrevious = this.tourItem.countInTour > 0;
    // }
    
    movePrevious(): void {
        //this.onChangeItem.emit(-1);
        this.current -= 1;
        this.calculatePositions();
    }
    
    moveNext(): void {
        //this.onChangeItem.emit(1);
        this.current += 1;
        this.calculatePositions();
    }

    display = false;
    current = 0;

    xPos = '0px';
    yPos = '0px';
    xArrowPos = '0px';

    heading?: string;
    text = '';
    tail = 'up';
    hasNext = false;
    hasPrevious = false;
}

export class CFTourElement {
    identifier: string; // ID: name, CLASS: name
    heading?: string;
    text: string;
    constructor(id: string, text: string, heading?: string) {
        this.identifier = id;
        this.text = text;
        this.heading = heading;
    }
}