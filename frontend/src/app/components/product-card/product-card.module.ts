import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ProductCardComponent } from "./product-card.component";

@NgModule({
    declarations: [ProductCardComponent],
    imports: [CommonModule,IonicModule],
    exports: [ProductCardComponent],
    providers: [],
})
export class ProductCardModule {}
