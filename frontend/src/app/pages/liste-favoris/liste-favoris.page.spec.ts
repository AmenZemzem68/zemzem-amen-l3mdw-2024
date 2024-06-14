import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListeFavorisPage } from './liste-favoris.page';

describe('ListeFavorisPage', () => {
  let component: ListeFavorisPage;
  let fixture: ComponentFixture<ListeFavorisPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListeFavorisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
