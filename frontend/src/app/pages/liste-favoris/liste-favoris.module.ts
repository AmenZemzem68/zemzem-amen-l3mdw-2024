import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeFavorisPageRoutingModule } from './liste-favoris-routing.module';

import { ListeFavorisPage } from './liste-favoris.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeFavorisPageRoutingModule
  ],
  declarations: [ListeFavorisPage]
})
export class ListeFavorisPageModule {}
