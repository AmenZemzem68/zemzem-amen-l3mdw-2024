import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageClientsPage } from './manage-clients.page';

const routes: Routes = [
  {
    path: '',
    component: ManageClientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageClientsPageRoutingModule {}
