import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadLinkComponent } from './download-link.component';

describe('DownloadLinkComponent', () => {
  let component: DownloadLinkComponent;
  let fixture: ComponentFixture<DownloadLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DownloadLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
