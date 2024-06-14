import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output , EventEmitter, output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent  implements OnInit {

  @Input() item!:any;
  @Output() productClick = new EventEmitter<any>();
  @Output() productAdded = new EventEmitter<any>();

  onCardClick() {
    this.productClick.emit(this.item);
  }
  constructor(private http : HttpClient) { }

  ngOnInit() {}
  addToCommand() {
    this.productAdded.emit(this.item);
  }
}
