import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfApplicantCardComponent } from './cf-applicant-card.component';

describe('CfApplicantCardComponent', () => {
  let component: CfApplicantCardComponent;
  let fixture: ComponentFixture<CfApplicantCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfApplicantCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfApplicantCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
