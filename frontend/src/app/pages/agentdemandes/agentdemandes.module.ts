import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgentdemandesPageRoutingModule } from './agentdemandes-routing.module';

import { AgentdemandesPage } from './agentdemandes.page';
import { SideMenuModule } from 'src/app/components/side-menu/side-menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgentdemandesPageRoutingModule,
    SideMenuModule

  ],
  declarations: [AgentdemandesPage]
})
export class AgentdemandesPageModule {}