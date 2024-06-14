import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageClientsPage } from './manage-clients.page';

describe('ManageClientsPage', () => {
  let component: ManageClientsPage;
  let fixture: ComponentFixture<ManageClientsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManageClientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
