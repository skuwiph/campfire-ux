import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfBannerComponent } from './cf-banner.component';

describe('CfBannerComponent', () => {
  let component: CfBannerComponent;
  let fixture: ComponentFixture<CfBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
