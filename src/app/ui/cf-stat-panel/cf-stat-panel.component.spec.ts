import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfStatPanelComponent } from './cf-stat-panel.component';

describe('CfStatPanelComponent', () => {
  let component: CfStatPanelComponent;
  let fixture: ComponentFixture<CfStatPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfStatPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfStatPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
