import { TestBed } from '@angular/core/testing';

import { CovidApiStatesService } from './covid-api-states.service';

describe('CovidApiStatesService', () => {
  let service: CovidApiStatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidApiStatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
