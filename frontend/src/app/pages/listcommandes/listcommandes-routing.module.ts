import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListcommandesPage } from './listcommandes.page';

const routes: Routes = [
  {
    path: '',
    component: ListcommandesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListcommandesPageRoutingModule {}
