import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { TirasseModalComponent } from "./tirasse-modal.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [TirasseModalComponent],
    imports: [CommonModule,IonicModule,FormsModule,ReactiveFormsModule ],
    exports: [TirasseModalComponent],
    providers: [],
})
export class TirasseModalModule {}
