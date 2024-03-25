import { TestBed } from '@angular/core/testing';

import { CfUiService } from './cf-ui.service';

describe('CfUiService', () => {
  let service: CfUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CfUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
