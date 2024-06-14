import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageArticlesPage } from './manage-articles.page';

describe('ManageArticlesPage', () => {
  let component: ManageArticlesPage;
  let fixture: ComponentFixture<ManageArticlesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManageArticlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
