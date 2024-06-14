import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageAgentsPageRoutingModule } from './manage-agents-routing.module';

import { ManageAgentsPage } from './manage-agents.page';
import { AgentModalModule } from 'src/app/modals/agent-modal/agent-modal.module';
import { ReusableTableModule } from 'src/app/components/reusable-table/reusable-table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageAgentsPageRoutingModule,
    AgentModalModule,
    ReusableTableModule
  ],
  declarations: [ManageAgentsPage]
})
export class ManageAgentsPageModule {}
