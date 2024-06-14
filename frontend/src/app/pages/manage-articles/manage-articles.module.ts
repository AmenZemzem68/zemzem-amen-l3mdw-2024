import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageArticlesPageRoutingModule } from './manage-articles-routing.module';

import { ManageArticlesPage } from './manage-articles.page';
import { ArticleModalModule } from 'src/app/modals/article-modal/article-modal.module';
import { ReusableTableModule } from 'src/app/components/reusable-table/reusable-table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageArticlesPageRoutingModule,
    ArticleModalModule,
    ReusableTableModule
  ],
  declarations: [ManageArticlesPage]
})
export class ManageArticlesPageModule {}
