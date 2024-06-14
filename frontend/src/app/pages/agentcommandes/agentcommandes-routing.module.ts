import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentcommandesPage } from './agentcommandes.page';

const routes: Routes = [
  {
    path: '',
    component: AgentcommandesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentcommandesPageRoutingModule {}
