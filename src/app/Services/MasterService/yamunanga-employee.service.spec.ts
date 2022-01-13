import { TestBed } from '@angular/core/testing';

import { YamunangaEmployeeService } from './yamunanga-employee.service';

describe('YamunangaEmployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YamunangaEmployeeService = TestBed.get(YamunangaEmployeeService);
    expect(service).toBeTruthy();
  });
});
