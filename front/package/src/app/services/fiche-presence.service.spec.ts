import { TestBed } from '@angular/core/testing';

import { FichePresenceService } from './fiche-presence.service';

describe('FichePresenceService', () => {
  let service: FichePresenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichePresenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
