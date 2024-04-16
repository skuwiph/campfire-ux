import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfModalComponent } from './cf-modal.component';

describe('CfModalComponent', () => {
  let component: CfModalComponent;
  let fixture: ComponentFixture<CfModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
