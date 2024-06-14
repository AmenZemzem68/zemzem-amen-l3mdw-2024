import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentuiPage } from './agentui.page';

const routes: Routes = [
  {
    path: '',
    component: AgentuiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentuiPageRoutingModule {}
