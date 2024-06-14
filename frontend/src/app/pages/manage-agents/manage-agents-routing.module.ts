import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageAgentsPage } from './manage-agents.page';

const routes: Routes = [
  {
    path: '',
    component: ManageAgentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageAgentsPageRoutingModule {}
