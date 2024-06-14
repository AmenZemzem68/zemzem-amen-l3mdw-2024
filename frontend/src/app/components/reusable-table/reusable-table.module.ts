import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ReusableTableComponent } from "./reusable-table.component";

@NgModule({
    declarations: [ReusableTableComponent],
    imports: [CommonModule,IonicModule],
    exports: [ReusableTableComponent],
    providers: [],
})
export class ReusableTableModule {}
