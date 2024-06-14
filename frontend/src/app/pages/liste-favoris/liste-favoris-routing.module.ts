import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeFavorisPage } from './liste-favoris.page';

const routes: Routes = [
  {
    path: '',
    component: ListeFavorisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeFavorisPageRoutingModule {}
