import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgentuiPageRoutingModule } from './agentui-routing.module';

import { AgentuiPage } from './agentui.page';
import { RouterModule } from '@angular/router';
import { SideMenuModule } from '../../components/side-menu/side-menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgentuiPageRoutingModule,
    RouterModule.forChild([{ path: '', component: AgentuiPage }]),
    SideMenuModule

  ],
  declarations: [AgentuiPage],
  exports: [],
  providers: [],
})
export class AgentuiPageModule {}
