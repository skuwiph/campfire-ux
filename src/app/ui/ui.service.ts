import { ElementRef, Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
    constructor() { }

    public getElementPositionByType(query: string): DOMRectList | undefined {
        const parts = query.split(':');
        if(parts.length == 1) {
            return this.getElementPositionByClass(parts[0]);
        } else {
            switch(parts[0]){
                case "CL":
                    return this.getElementPositionByClass(parts[1]);
                case "ID":
                    return this.getElementPositionById(parts[1]);
                default:
                    console.error(`Unexpected query: Expected CL: or ID: but got: '${query}'`);
            }
        }

        return undefined;
    }

    public getElementPositionById(id: string): DOMRectList | undefined {
        const e = document.getElementById(id);
        if(e) {
            return e.getClientRects();
        }
        return undefined;
    }

    public getElementPositionByClass(className: string): DOMRectList | undefined {
        if(className.includes(".")) {
            console.log(`Looking for ${className}`);
            const e = document.querySelectorAll(className);
            if (e && e.length > 0) {
                return e[0].getClientRects();
            } else {
                console.warn(`No elements found matching ${className}`);
            }
        } else {
            const e = document.getElementsByClassName(className);
            if (e && e.length > 0) {
                return e[0].getClientRects();
            }
        }
        return undefined;
    }
}
