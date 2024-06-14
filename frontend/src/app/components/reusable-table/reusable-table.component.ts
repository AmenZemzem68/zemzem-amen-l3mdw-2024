import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reusable-table',
  templateUrl: './reusable-table.component.html',
  styleUrls: ['./reusable-table.component.scss'],
})
export class ReusableTableComponent {
  @Input() data: any[] = [];
  @Input() columns: { key: string; title: string }[] = [];
  @Input() actions: boolean = false;
  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();

  constructor() { }

  onDelete(item: any) {
    this.delete.emit(item);
  }

  onEdit(item: any) {
    this.edit.emit(item);
  }

  getNestedValue(obj: any, key: string): any {
    return key.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
}
