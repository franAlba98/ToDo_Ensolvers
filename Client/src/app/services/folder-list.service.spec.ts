import { TestBed } from '@angular/core/testing';

import { FolderListService } from './folder-list.service';

describe('FolderListService', () => {
  let service: FolderListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FolderListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
