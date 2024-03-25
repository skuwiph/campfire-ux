import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfTypeaheadComponent } from './cf-typeahead.component';

describe('CfTypeaheadComponent', () => {
  let component: CfTypeaheadComponent;
  let fixture: ComponentFixture<CfTypeaheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfTypeaheadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
