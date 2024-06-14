import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { VerticalChartComponent } from "./vertical-chart.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";

@NgModule({
    declarations: [VerticalChartComponent],
    imports: [CommonModule,IonicModule,NgxChartsModule],
    exports: [VerticalChartComponent],
    providers: [],
})
export class VerticalChartModule {}
