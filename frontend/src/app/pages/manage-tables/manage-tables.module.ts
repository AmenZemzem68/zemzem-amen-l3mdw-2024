import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageTablesPageRoutingModule } from './manage-tables-routing.module';

import { ManageTablesPage } from './manage-tables.page';
import { TableModalModule } from 'src/app/modals/table-modal/table-modal.module';
import { ReusableTableModule } from 'src/app/components/reusable-table/reusable-table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageTablesPageRoutingModule,
    TableModalModule,
    ReusableTableModule
  ],
  declarations: [ManageTablesPage]
})
export class ManageTablesPageModule {}
