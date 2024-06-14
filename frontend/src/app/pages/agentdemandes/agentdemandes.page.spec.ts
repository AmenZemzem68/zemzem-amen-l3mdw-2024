import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgentdemandesPage } from './agentdemandes.page';

describe('AgentdemandesPage', () => {
  let component: AgentdemandesPage;
  let fixture: ComponentFixture<AgentdemandesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgentdemandesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
