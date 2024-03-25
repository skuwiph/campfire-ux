import { Injectable, Type } from '@angular/core';
import { CfStatusDisplayComponent } from './cf-status-display/cf-status-display.component';

@Injectable({
    providedIn: 'root'
})
export class CfUiService {

    constructor() { }

    getStatusComponent(userState: string) {
        return {
            component: CfStatusDisplayComponent,
            inputs: { status: userState }
        } as {component: Type<any>, inputs: Record<string, unknown>};
    }
}
