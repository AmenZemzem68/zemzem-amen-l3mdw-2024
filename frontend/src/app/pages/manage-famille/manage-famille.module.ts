import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageFamillePageRoutingModule } from './manage-famille-routing.module';

import { ManageFamillePage } from './manage-famille.page';
import { FamilleArticleModalModule } from 'src/app/modals/famille-article-modal/famille-article-modal.module';
import { ReusableTableModule } from 'src/app/components/reusable-table/reusable-table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageFamillePageRoutingModule,
    FamilleArticleModalModule,
    ReusableTableModule
  ],
  declarations: [ManageFamillePage]
})
export class ManageFamillePageModule {}
