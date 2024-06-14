import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageFamillePage } from './manage-famille.page';

const routes: Routes = [
  {
    path: '',
    component: ManageFamillePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageFamillePageRoutingModule {}
