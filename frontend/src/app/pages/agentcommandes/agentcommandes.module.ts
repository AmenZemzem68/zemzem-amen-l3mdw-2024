import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgentcommandesPageRoutingModule } from './agentcommandes-routing.module';

import { AgentcommandesPage } from './agentcommandes.page';
import { SideMenuModule } from 'src/app/components/side-menu/side-menu.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgentcommandesPageRoutingModule,
    SideMenuModule
  ],
  declarations: [AgentcommandesPage]
})
export class AgentcommandesPageModule {}
