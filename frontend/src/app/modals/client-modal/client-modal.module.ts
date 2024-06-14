import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ClientModalComponent } from "./client-modal.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ClientModalComponent],
    imports: [CommonModule,IonicModule,FormsModule,ReactiveFormsModule ],
    exports: [ClientModalComponent],
    providers: [],
})
export class ClientModalModule {}
