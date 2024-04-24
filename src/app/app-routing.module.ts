import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlSummaryComponent } from './control-summary.component';
import { MobileDeviceLayoutComponent } from './mobile-device-layout.component';
import { StickyLayoutComponent } from './sticky-layout.component';
import { UserDetailsLayoutComponent } from './user-details-layout.component';

const routes: Routes = [
    { path: '', component: ControlSummaryComponent },
    { path: 'sticky', component: StickyLayoutComponent },
    { path: 'mobile', component: MobileDeviceLayoutComponent },
    { path: 'user', component: UserDetailsLayoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
