import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfAlertComponent } from './cf-alert.component';

describe('CfAlertComponent', () => {
  let component: CfAlertComponent;
  let fixture: ComponentFixture<CfAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
