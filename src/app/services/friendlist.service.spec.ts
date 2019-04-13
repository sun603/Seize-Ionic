import { TestBed } from '@angular/core/testing';

import { FriendlistService } from './friendlist.service';

describe('FriendlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FriendlistService = TestBed.get(FriendlistService);
    expect(service).toBeTruthy();
  });
});
