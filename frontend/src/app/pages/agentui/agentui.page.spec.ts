import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgentuiPage } from './agentui.page';

describe('AgentuiPage', () => {
  let component: AgentuiPage;
  let fixture: ComponentFixture<AgentuiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgentuiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
