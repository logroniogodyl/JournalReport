import { Component, inject, ViewChild } from '@angular/core';

import { ScreenshotCaptureService } from '../../API/screenshot-capture.service';
import { ToastrService } from 'ngx-toastr';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { catchError, finalize } from 'rxjs';


@Component({
  selector: 'app-download-link',
  standalone: true,
  imports: [
    BrowserAnimationsModule, MatButtonModule, MatInputModule, MatFormFieldModule
  ],
  templateUrl: './download-link.component.html',
  styleUrl: './download-link.component.css',
})
export class DownloadLinkComponent{
  private screenshotService = inject(ScreenshotCaptureService);
  private toastr = inject(ToastrService);

  remainingDownloads: number = 2;
  downloadDisabled: boolean = false;

  inputValue: boolean = false;
  screenshotFile?: Blob;

  private timer: any;

  @ViewChild('#articleLinkInput') urlInput?: MatInput;

  checkInputValue(value: string): void {
    this.inputValue = !!value;
  }

  startTimer(): void {
    this.timer = setTimeout(() => {
      this.remainingDownloads = 2;
      this.downloadDisabled = false;
    }, 60000); // 60000 milliseconds = 1 minute
  }

  captureAndAssignScreenshot(url: string): void {
    if (this.remainingDownloads > 0)
      this.remainingDownloads--;
    console.log(this.remainingDownloads);

    this.screenshotService.captureScreenshot(url)
      .pipe(
        catchError(error => {
          console.error('Error capturing screenshot', error);
          this.toastr.error('Failed to capture screenshot', error.error);
          if (this.urlInput)
            this.urlInput.value = '';
          throw error;
        }),
        finalize(() => {})
      )
      .subscribe((screenshot: Blob) => {
        this.screenshotFile = screenshot;
        if (this.remainingDownloads === 0) {
          this.downloadDisabled = true;
          this.startTimer();
        }
        console.log(this.downloadDisabled);

        console.log('Blob details:', screenshot);
        console.log('Blob type:', screenshot.type);
        console.log('Blob size:', screenshot.size);

        if (screenshot.type === 'image/png' && screenshot.size > 0) {
          const url = window.URL.createObjectURL(screenshot);
          const link = document.createElement('a');
          link.href = url;
          link.download = `screenshot${Date.now().toString()}.png`;
          link.click();
          window.URL.revokeObjectURL(url);
          this.toastr.success(`You donwloaded the screenshot from ${url}`)
        } else {
          this.toastr.error('The file format is not supported or the file is empty.');
        }
      });

      //  const blob = new Blob([screenshot], { type: 'image/png' });

      //  const url = window.URL.createObjectURL(blob);
      //  const link = document.createElement('a');
      //  link.href = url;
      //  link.download = `screenshot.png`;

      //  link.click();

      //  window.URL.revokeObjectURL(url);
      //});
  }
}
