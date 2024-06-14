import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageArticlesPage } from './manage-articles.page';

const routes: Routes = [
  {
    path: '',
    component: ManageArticlesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageArticlesPageRoutingModule {}
