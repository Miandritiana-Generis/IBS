import { TestBed } from '@angular/core/testing';

import { NotificationEdtService } from './notification-edt.service';

describe('NotificationEdtService', () => {
  let service: NotificationEdtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationEdtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
