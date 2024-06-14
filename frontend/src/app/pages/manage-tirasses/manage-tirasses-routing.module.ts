import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageTirassesPage } from './manage-tirasses.page';

const routes: Routes = [
  {
    path: '',
    component: ManageTirassesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageTirassesPageRoutingModule {}
