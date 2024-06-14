import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageClientsPageRoutingModule } from './manage-clients-routing.module';

import { ManageClientsPage } from './manage-clients.page';
import { ClientModalModule } from 'src/app/modals/client-modal/client-modal.module';
import { ReusableTableModule } from 'src/app/components/reusable-table/reusable-table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageClientsPageRoutingModule,
    ClientModalModule,
    ReusableTableModule
  ],
  declarations: [ManageClientsPage]
})
export class ManageClientsPageModule {}
