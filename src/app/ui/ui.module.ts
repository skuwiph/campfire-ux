import { NgModule, Sanitizer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContenteditableValueAccessorModule } from '@tinkoff/angular-contenteditable-accessor';

import { CfAlertComponent } from './cf-alert/cf-alert.component';
import { CfApplicantCardComponent } from './cf-applicant-card/cf-applicant-card.component';
import { CfApplicationCardComponent } from './cf-application-card/cf-application-card.component';
import { CfBannerComponent } from './cf-banner/cf-banner.component';
import { CfButtonComponent } from './cf-button/cf-button.component';
import { CfDialogComponent } from './cf-dialog/cf-dialog.component';
import { CfDropdownComponent } from './cf-dropdown/cf-dropdown.component';
import { CfEntityActivityComponent } from './cf-entity-activity/cf-entity-activity.component';
import { CfLoaderComponent } from './cf-loader/cf-loader.component';
import { CfMentionTextComponent } from './cf-mention-text/cf-mention-text.component';
import { CfMenuComponent } from './cf-menu/cf-menu.component';
import { CfProfileComponent } from './cf-profile/cf-profile.component';
import { CfProgressComponent } from './cf-progress/cf-progress.component';
import { CfStatPanelComponent } from './cf-stat-panel/cf-stat-panel.component';
import { CfStatusDisplayComponent } from './cf-status-display/cf-status-display.component';
import { CfTabComponent } from './cf-tab/cf-tab.component';
import { CfTableComponent } from './cf-table/cf-table.component';
import { CfTypeaheadComponent } from './cf-typeahead/cf-typeahead.component';
import { CfUserProfileStackComponent } from './cf-user-profile-stack/cf-user-profile-stack.component';
import { BoldTextPipe } from './boldspan.pipe';
import { CloudimageCropPipe, CloudimagePipe } from './cloudimage.pipe';
import { CfUserTargetComponent } from './cf-user-target/cf-user-target.component';
import { CfSidebarMenuComponent } from './cf-sidebar-menu/cf-sidebar-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        CfAlertComponent,
        CfApplicantCardComponent,
        CfApplicationCardComponent,
        CfBannerComponent,
        CfButtonComponent,
        CfDialogComponent,
        CfDropdownComponent,
        CfEntityActivityComponent,
        CfLoaderComponent,
        CfMenuComponent,
        CfMentionTextComponent,
        CfProfileComponent,
        CfProgressComponent,
        CfSidebarMenuComponent,
        CfStatPanelComponent,
        CfStatusDisplayComponent,
        CfTabComponent,
        CfTableComponent,
        CfTypeaheadComponent,
        CfUserProfileStackComponent,
        CfUserTargetComponent,
        BoldTextPipe,
        CloudimageCropPipe,
        CloudimagePipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        ContenteditableValueAccessorModule,
    ],
    exports: [
        CfAlertComponent,
        CfApplicantCardComponent,
        CfApplicationCardComponent,
        CfBannerComponent,
        CfButtonComponent,
        CfDialogComponent,
        CfDropdownComponent,
        CfEntityActivityComponent,
        CfLoaderComponent,
        CfMenuComponent,
        CfMentionTextComponent,
        CfProfileComponent,
        CfProgressComponent,
        CfSidebarMenuComponent,
        CfStatusDisplayComponent,
        CfStatPanelComponent,
        CfTabComponent,
        CfTableComponent,
        CfTypeaheadComponent,
        CfUserProfileStackComponent,
        CfUserTargetComponent,
    ],
    providers: []
})
export class UiModule { }
