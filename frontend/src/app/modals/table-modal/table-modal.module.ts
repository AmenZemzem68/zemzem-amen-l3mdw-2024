import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { TableModalComponent } from "./table-modal.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [TableModalComponent],
    imports: [CommonModule,IonicModule,FormsModule,ReactiveFormsModule ],
    exports: [TableModalComponent],
    providers: [],
})
export class TableModalModule {}
