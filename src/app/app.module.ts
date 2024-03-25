import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlSummaryComponent } from './control-summary.component';
import { UiModule } from './ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CfUiService } from './ui/cf-ui.service';

@NgModule({
  declarations: [
    AppComponent,
    ControlSummaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
  ],
  providers: [
    CfUiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
