import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { AgentModalComponent } from "./agent-modal.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AgentModalComponent],
    imports: [CommonModule,IonicModule,FormsModule,ReactiveFormsModule ],
    exports: [AgentModalComponent],
    providers: [],
})
export class AgentModalModule {}
