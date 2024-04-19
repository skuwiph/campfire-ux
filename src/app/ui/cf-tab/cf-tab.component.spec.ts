import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfTabComponent } from './cf-tab.component';

describe('CfTabComponent', () => {
  let component: CfTabComponent;
  let fixture: ComponentFixture<CfTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
