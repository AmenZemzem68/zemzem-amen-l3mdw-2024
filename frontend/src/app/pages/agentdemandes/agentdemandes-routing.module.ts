import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentdemandesPage } from './agentdemandes.page';

const routes: Routes = [
  {
    path: '',
    component: AgentdemandesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentdemandesPageRoutingModule {}
