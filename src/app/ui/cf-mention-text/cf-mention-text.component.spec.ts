import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfMentionTextComponent } from './cf-mention-text.component';

describe('CfMentionTextComponent', () => {
  let component: CfMentionTextComponent;
  let fixture: ComponentFixture<CfMentionTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfMentionTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CfMentionTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
