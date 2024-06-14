import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageFamillePage } from './manage-famille.page';

describe('ManageFamillePage', () => {
  let component: ManageFamillePage;
  let fixture: ComponentFixture<ManageFamillePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManageFamillePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
