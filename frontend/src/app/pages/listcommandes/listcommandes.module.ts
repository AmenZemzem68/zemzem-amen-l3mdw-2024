import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListcommandesPageRoutingModule } from './listcommandes-routing.module';

import { ListcommandesPage } from './listcommandes.page';
import { SideMenuModule } from 'src/app/components/side-menu/side-menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListcommandesPageRoutingModule,
    SideMenuModule
  ],
  declarations: [ListcommandesPage]
})
export class ListcommandesPageModule {}
