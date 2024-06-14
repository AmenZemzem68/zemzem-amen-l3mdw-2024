import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageAgentsPage } from './manage-agents.page';

describe('ManageAgentsPage', () => {
  let component: ManageAgentsPage;
  let fixture: ComponentFixture<ManageAgentsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManageAgentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
