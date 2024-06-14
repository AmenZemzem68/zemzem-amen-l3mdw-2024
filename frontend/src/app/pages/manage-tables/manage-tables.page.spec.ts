import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageTablesPage } from './manage-tables.page';

describe('ManageTablesPage', () => {
  let component: ManageTablesPage;
  let fixture: ComponentFixture<ManageTablesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManageTablesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
