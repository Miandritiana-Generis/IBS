import { TestBed } from '@angular/core/testing';

import { JustificationAbsenceService } from './justification-absence.service';

describe('JustificationAbsenceService', () => {
  let service: JustificationAbsenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JustificationAbsenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
