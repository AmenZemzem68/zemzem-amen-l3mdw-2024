import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageTablesPage } from './manage-tables.page';

const routes: Routes = [
  {
    path: '',
    component: ManageTablesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageTablesPageRoutingModule {}
