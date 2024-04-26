import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { UiModule } from './ui/ui.module';
import { UiService } from './ui/ui.service';

import { AppComponent } from './app.component';
import { ControlSummaryComponent } from './control-summary.component';
import { MobileDeviceLayoutComponent } from './mobile-device-layout.component';
import { StickyLayoutComponent } from './sticky-layout.component';
import { UserDetailsLayoutComponent } from './user-details-layout.component';
import { ListLayoutComponent } from './list-layout.component';

@NgModule({
    declarations: [
        AppComponent,
        ControlSummaryComponent,
        MobileDeviceLayoutComponent,
        StickyLayoutComponent,
        UserDetailsLayoutComponent,
        ListLayoutComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        UiModule,
    ],
    providers: [
        UiService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
