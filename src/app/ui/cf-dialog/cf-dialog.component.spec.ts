import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfDialogComponent } from './cf-dialog.component';

describe('CfDialogComponent', () => {
  let component: CfDialogComponent;
  let fixture: ComponentFixture<CfDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
