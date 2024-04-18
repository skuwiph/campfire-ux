import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfProgressComponent } from './cf-progress.component';

describe('CfProgressComponent', () => {
  let component: CfProgressComponent;
  let fixture: ComponentFixture<CfProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
