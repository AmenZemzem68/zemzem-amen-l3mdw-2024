import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageTirassesPageRoutingModule } from './manage-tirasses-routing.module';

import { ManageTirassesPage } from './manage-tirasses.page';
import { TirasseModalModule } from 'src/app/modals/tirasse-modal/tirasse-modal.module';
import { ReusableTableModule } from 'src/app/components/reusable-table/reusable-table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageTirassesPageRoutingModule,
    TirasseModalModule,
    ReusableTableModule
  ],
  declarations: [ManageTirassesPage]
})
export class ManageTirassesPageModule {}
