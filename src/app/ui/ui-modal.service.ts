import { ApplicationRef, EmbeddedViewRef, Injectable, createComponent } from '@angular/core';
import { CFModalButton, CFModalType, CfModalComponent } from './cf-modal/cf-modal.component';
import { CFButtonType } from './cf-button/cf-button.component';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiModalService {
    constructor(private appRef: ApplicationRef) { }

    public showModalInformation(title: string, message: string): Observable<string> {
        return this.createModal(
            CFModalType.Information, 
            title, 
            message, 
            [{ type: CFButtonType.Default, id: 'OK', text: 'OK' }],
        );
    }

    public showModalConfirmation(title: string, message: string, buttons: CFModalButton[]): Observable<string> {
        return this.createModal(
            CFModalType.Confirmation,
            title,
            message,
            buttons,
        );
    }

    public showModalWarning(title: string, message: string, buttons: CFModalButton[]): Observable<string> {
        return this.createModal(
            CFModalType.Warning,
            title,
            message,
            buttons,
        );
    }

    public showModalError(title: string, message: string): Observable<string> {
        return this.createModal(
            CFModalType.Error,
            title,
            message,
            [{ type: CFButtonType.Default, id: 'OK', text: 'OK' }],
        );
    }

    private createModal(type: CFModalType, title: string, message: string, buttons: CFModalButton[]): Observable<string> {
        const s = new Subject<string>();

        const componentRef = createComponent(CfModalComponent, {
            environmentInjector: this.appRef.injector,
        });
            componentRef.instance.type = type;
            componentRef.instance.title = title;
            componentRef.instance.message = message;
            componentRef.instance.buttons = buttons;

        const ref = componentRef.instance.onRemove.subscribe((data: string) => {
            // remove element, then unsubscribe
            this.appRef.detachView(componentRef.hostView);
            componentRef.destroy();
            ref.unsubscribe();
            evt.unsubscribe();
        });

        // Just for calls back from the button array;
        // a separate onRemove gets fired after a button
        // press is detected.
        const evt = componentRef.instance.onSelected.subscribe((data: string) => {
            s.next(data);
        })

        // attach view to make it part of change detection cycle
        this.appRef.attachView(componentRef.hostView);
        document.body.append((<EmbeddedViewRef<any>>componentRef.hostView).rootNodes[0]);
        
        // componentRef.instance.openDialog();

        return s;            
    }
}
