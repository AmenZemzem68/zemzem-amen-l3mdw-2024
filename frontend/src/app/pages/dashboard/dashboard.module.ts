import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { ReusableTableModule } from 'src/app/components/reusable-table/reusable-table.module';
import { AgentModalModule } from 'src/app/modals/agent-modal/agent-modal.module';
import { FamilleArticleModalModule } from 'src/app/modals/famille-article-modal/famille-article-modal.module';
import { ArticleModalModule } from 'src/app/modals/article-modal/article-modal.module';
import { TableModalModule } from 'src/app/modals/table-modal/table-modal.module';
import { TirasseModalModule } from 'src/app/modals/tirasse-modal/tirasse-modal.module';
import { ClientModalModule } from 'src/app/modals/client-modal/client-modal.module';
import { VerticalChartModule } from 'src/app/components/vertical-chart/vertical-chart.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    ReusableTableModule,
    AgentModalModule,
    FamilleArticleModalModule,
    ArticleModalModule,
    TableModalModule,
    TirasseModalModule,
    ClientModalModule,
    VerticalChartModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
