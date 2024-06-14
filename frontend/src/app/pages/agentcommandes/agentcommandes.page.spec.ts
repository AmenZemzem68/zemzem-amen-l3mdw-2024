import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgentcommandesPage } from './agentcommandes.page';

describe('AgentcommandesPage', () => {
  let component: AgentcommandesPage;
  let fixture: ComponentFixture<AgentcommandesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgentcommandesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
