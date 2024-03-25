import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfTableComponent } from './cf-table.component';

describe('CfTableComponent', () => {
  let component: CfTableComponent;
  let fixture: ComponentFixture<CfTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
