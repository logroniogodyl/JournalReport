import { TestBed } from '@angular/core/testing';

import { ScreenshotCaptureService } from './screenshot-capture.service';

describe('ScreenshotCaptureService', () => {
  let service: ScreenshotCaptureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenshotCaptureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
