import { NgModule, Sanitizer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContenteditableValueAccessorModule } from '@tinkoff/angular-contenteditable-accessor';

import { CfAlertComponent } from './cf-alert/cf-alert.component';
import { CfApplicantCardComponent } from './cf-applicant-card/cf-applicant-card.component';
import { CfButtonComponent } from './cf-button/cf-button.component';
import { CfDialogComponent } from './cf-dialog/cf-dialog.component';
import { CfLoaderComponent } from './cf-loader/cf-loader.component';
import { CfMentionTextComponent } from './cf-mention-text/cf-mention-text.component';
import { CfMenuComponent } from './cf-menu/cf-menu.component';
import { CfProfileComponent } from './cf-profile/cf-profile.component';
import { CfTableComponent } from './cf-table/cf-table.component';
import { CfTypeaheadComponent } from './cf-typeahead/cf-typeahead.component';
import { CfWhatsNewComponent } from './cf-whats-new/cf-whats-new.component';
import { CfStatusDisplayComponent } from './cf-status-display/cf-status-display.component';
import { BoldTextPipe } from './boldspan.pipe';
import { CloudimageCropPipe, CloudimagePipe } from './cloudimage.pipe';
import { CfDropdownComponent } from './cf-dropdown/cf-dropdown.component';


@NgModule({
    declarations: [
        CfAlertComponent,
        CfApplicantCardComponent,
        CfButtonComponent,
        CfDialogComponent,
        CfDropdownComponent,
        CfLoaderComponent,
        CfMenuComponent,
        CfMentionTextComponent,
        CfProfileComponent,
        CfStatusDisplayComponent,
        CfTableComponent,
        CfTypeaheadComponent,
        CfWhatsNewComponent,
        BoldTextPipe,
        CloudimageCropPipe,
        CloudimagePipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ContenteditableValueAccessorModule,
    ],
    exports: [
        CfAlertComponent,
        CfApplicantCardComponent,
        CfButtonComponent,
        CfDialogComponent,
        CfDropdownComponent,
        CfLoaderComponent,
        CfMenuComponent,
        CfMentionTextComponent,
        CfProfileComponent,
        CfStatusDisplayComponent,
        CfTableComponent,
        CfTypeaheadComponent, 
        CfWhatsNewComponent,
    ],
    providers: []
})
export class UiModule { }
