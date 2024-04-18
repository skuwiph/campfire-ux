import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfApplicationCardComponent } from './cf-application-card.component';

describe('CfApplicationCardComponent', () => {
  let component: CfApplicationCardComponent;
  let fixture: ComponentFixture<CfApplicationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfApplicationCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfApplicationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
