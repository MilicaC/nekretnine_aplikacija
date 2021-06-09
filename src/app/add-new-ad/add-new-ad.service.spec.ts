import { TestBed } from '@angular/core/testing';

import { AddNewAdService } from './add-new-ad.service';

describe('AddNewAdService', () => {
  let service: AddNewAdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNewAdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
