import { NgModule, Sanitizer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContenteditableValueAccessorModule } from '@tinkoff/angular-contenteditable-accessor';

import { CfUiService } from './cf-ui.service';
import { CfAlertComponent } from './cf-alert/cf-alert.component';
import { CfButtonComponent } from './cf-button/cf-button.component';
import { CfDialogComponent } from './cf-dialog/cf-dialog.component';
import { CfLoaderComponent } from './cf-loader/cf-loader.component';
import { CfMenuComponent } from './cf-menu/cf-menu.component';
import { CfProfileComponent } from './cf-profile/cf-profile.component';
import { CfStatusDisplayComponent } from './cf-status-display/cf-status-display.component';
import { CfTableComponent } from './cf-table/cf-table.component';
import { CfTypeaheadComponent } from './cf-typeahead/cf-typeahead.component';
import { CloudimageCropPipe, CloudimagePipe } from './cloudimage.pipe';
import { CfApplicantCardComponent } from './cf-applicant-card/cf-applicant-card.component';
import { CfMentionTextComponent } from './cf-mention-text/cf-mention-text.component';
import { BoldTextPipe } from './boldspan.pipe';


@NgModule({
    declarations: [
        CfAlertComponent,
        CfApplicantCardComponent,
        CfButtonComponent,
        CfDialogComponent,
        CfLoaderComponent,
        CfMenuComponent,
        CfMentionTextComponent,
        CfProfileComponent,
        CfStatusDisplayComponent,
        CfTableComponent,
        CfTypeaheadComponent,
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
        CfLoaderComponent,
        CfMenuComponent,
        CfMentionTextComponent,
        CfProfileComponent,
        CfStatusDisplayComponent,
        CfTableComponent,
        CfTypeaheadComponent,
    ],
    providers: [
        CfUiService,
    ]
})
export class UiModule { }
