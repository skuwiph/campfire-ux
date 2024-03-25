import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfStatusDisplayComponent } from './cf-status-display.component';

describe('CfStatusDisplayComponent', () => {
  let component: CfStatusDisplayComponent;
  let fixture: ComponentFixture<CfStatusDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfStatusDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfStatusDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
