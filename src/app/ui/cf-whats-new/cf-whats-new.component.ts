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

    movePrevious(): void {
        this.current -= 1;
        this.calculatePositions();
    }

    moveNext(): void {
        this.current += 1;
        this.calculatePositions();
    }

    cancelTour(): void {
        this.display = false;

        if (this.lastElement) {
            this.lastElement.classList.remove('tour-target');
        }

        this.onEndTour.emit(true);
    }

    calculatePositions(): void {
        const c = this.tourItems[this.current];

        if (this.lastElement) {
            this.lastElement.classList.remove('tour-target');
        }

        const targetElement = this.uiService.getElementPositionByType(c.identifier);
        if (targetElement) {
            // Defines the target rect (element to point at)
            // and the total area required by the target rect and the tour 
            // window
            const b = targetElement.bounds;
            
            const tr1 = this.getElementPositionScreen({ x: b[0].x, y: b[0].y, width: b[0].width, height: b[0].height});
            const tr2 = this.getElementPositionScreen({ x: tr1.x, y: tr1.y, width: Math.max(tr1.w, 280), height: Math.max(tr1.h, 400)});
            const scr = this.getElementPositionScreen({ x: window.visualViewport?.pageLeft ?? 0, y: window.visualViewport?.pageTop ?? 0, width: window.visualViewport?.width ?? 0, height: window.visualViewport?.height ?? 0});
            const fit = { x: Math.min(tr1.x, tr2.x), y: Math.min(tr1.y, tr2.y), w: Math.max(tr1.w, tr2.w), h: Math.max(tr1.h, tr2.h)};
            
            // console.log(`Screen is ${JSON.stringify(scr, null,2)}`);
            // console.log(`Target is ${JSON.stringify(tr1, null, 2)}`);
            // console.log(`Expect to fit a rectangle of ${JSON.stringify(fit,null,2)}`);
            
            const target = { x: fit.x, y: fit.y };
            
            if( fit.y + fit.h < scr.y ) {
                // console.log(`Target is above current screen position`);
                target.y -= (target.y > 30 ? 30 : 0);
                
                window.scrollTo({ left: target.x, top: target.y, behavior: 'smooth' })
            } else if(fit.y > scr.y + scr.h) {
                // console.log(`Target is below current screen position`);
                window.scrollTo({ left: target.x, top: target.y, behavior: 'smooth' })
            }
            
            const pointer = { x: (tr1.x + (tr1.w/2)) - 200, y: tr1.y + (tr1.h) };
            // console.log(`Want to point towards: ${JSON.stringify(pointer,null,2)}`);
            
            var top = pointer.y;
            var left = pointer.x;
            
            var xArrow = left;
            this.tail = "up";
            if (left < 35) {
                left = (tr1.x + tr1.w)/2 - 15;
                this.tail = "up-left";
                if(left < 35) left = 35;
            } else if (left + 400 > scr.w) {
                left = scr.w - 400;
            }
            // console.log(`Want to center on ${left}`);
            // console.log(`Left is at : ${left}px, width of bubble is 400px`);
            
            this.xPos = `${left}px`;
            this.xArrowPos = `${xArrow}px`;
            this.yPos = `${top}px`;
            this.heading = c.heading;
            this.text = c.text;
            
            this.hasNext = this.current < this.tourItems.length - 1;
            this.hasPrevious = this.current > 0;
            this.display = true;
            
            targetElement.element.classList.add('tour-target');
            this.lastElement = targetElement.element;

            this.onTourItemChanged.emit(c);
        } else {
            this.cancelTour();
            console.warn(`Couldn't get element from ${c.identifier}`);
        }
    }

    getElementPositionScreen(r: { x: number, y: number, width: number, height: number }): { x: number, y: number, w: number, h: number } {
        var sx = r.x + window.scrollX;
        var sy = r.y + window.scrollY;
        var sw = r.width;
        var sh = r.height;

        return { x: sx, y: sy, w: sw, h: sh };
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

    lastElement: HTMLElement | undefined;
    lastElementZIndex = '0';
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