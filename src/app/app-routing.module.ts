import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlSummaryComponent } from './control-summary.component';

const routes: Routes = [
    {
        path: '', component: ControlSummaryComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
