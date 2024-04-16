import { ApplicationRef, EmbeddedViewRef, Injectable, createComponent } from '@angular/core';
import { CFTourElement, CfWhatsNewComponent } from './cf-whats-new/cf-whats-new.component';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
    constructor(private appRef: ApplicationRef) { }


    public startTour(tourItems: CFTourElement[]): Observable<CFTourElement> {
        const s = new Subject<CFTourElement>();

        const componentRef = createComponent(CfWhatsNewComponent, {
            environmentInjector: this.appRef.injector,
        });
        componentRef.instance.tourItems = tourItems;

        const tour = componentRef.instance
            .onTourItemChanged
            .subscribe({
                next: (ti: CFTourElement) => {
                    s.next(ti);
                },
            });

        const ref = componentRef.instance
            .onEndTour
            .subscribe({
                next: (data: boolean) => {
                    s.complete();

                    // remove element, then unsubscribe
                    this.appRef.detachView(componentRef.hostView);
                    componentRef.destroy();
                    ref.unsubscribe();
                    tour.unsubscribe();
            }
        });


        // attach view to make it part of change detection cycle
        this.appRef.attachView(componentRef.hostView);
        document.body.append((<EmbeddedViewRef<any>>componentRef.hostView).rootNodes[0]);

        componentRef.instance.startTour();

        return s;
    }

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
            //console.log(`Looking for ${className}`);
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
