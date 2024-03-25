import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfProfileComponent } from './cf-profile.component';

describe('CfProfileComponent', () => {
  let component: CfProfileComponent;
  let fixture: ComponentFixture<CfProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
