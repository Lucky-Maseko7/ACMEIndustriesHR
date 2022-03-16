/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthServiceService } from './Auth.service';

describe('Service: AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthServiceService]
    });
  });

  it('should ...', inject([AuthServiceService], (service: AuthServiceService) => {
    expect(service).toBeTruthy();
  }));
});
