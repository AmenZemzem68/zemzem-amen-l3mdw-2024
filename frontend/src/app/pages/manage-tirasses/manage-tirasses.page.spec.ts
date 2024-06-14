import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageTirassesPage } from './manage-tirasses.page';

describe('ManageTirassesPage', () => {
  let component: ManageTirassesPage;
  let fixture: ComponentFixture<ManageTirassesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManageTirassesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
