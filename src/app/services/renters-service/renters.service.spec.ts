import { TestBed, inject } from '@angular/core/testing';
import { RentersService } from './renters.service';



describe('RentersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RentersService]
    });
  });

  it('should be created', inject([RentersService], (service: RentersService) => {
    expect(service).toBeTruthy();
  }));
});
