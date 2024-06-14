import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListcommandesPage } from './listcommandes.page';

describe('ListcommandesPage', () => {
  let component: ListcommandesPage;
  let fixture: ComponentFixture<ListcommandesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListcommandesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
