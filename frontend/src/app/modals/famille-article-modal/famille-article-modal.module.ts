import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FamilleArticleModalComponent } from "./famille-article-modal.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [FamilleArticleModalComponent],
    imports: [CommonModule,IonicModule,FormsModule,ReactiveFormsModule ],
    exports: [FamilleArticleModalComponent],
    providers: [],
})
export class FamilleArticleModalModule {}
