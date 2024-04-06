import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlSummaryComponent } from './control-summary.component';
import { StickyLayoutComponent } from './sticky-layout.component';

const routes: Routes = [
    { path: '', component: ControlSummaryComponent },
    { path: 'sticky', component: StickyLayoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
