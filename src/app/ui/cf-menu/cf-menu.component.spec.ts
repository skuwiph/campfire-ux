import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfMenuComponent } from './cf-menu.component';

describe('CfMenuComponent', () => {
  let component: CfMenuComponent;
  let fixture: ComponentFixture<CfMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
