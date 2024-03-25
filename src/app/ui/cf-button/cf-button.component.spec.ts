import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfButtonComponent } from './cf-button.component';

describe('CfButtonComponent', () => {
  let component: CfButtonComponent;
  let fixture: ComponentFixture<CfButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
