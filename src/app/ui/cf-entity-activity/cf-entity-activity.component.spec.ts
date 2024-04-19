import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfEntityActivityComponent } from './cf-entity-activity.component';

describe('CfEntityActivityComponent', () => {
  let component: CfEntityActivityComponent;
  let fixture: ComponentFixture<CfEntityActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfEntityActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfEntityActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
