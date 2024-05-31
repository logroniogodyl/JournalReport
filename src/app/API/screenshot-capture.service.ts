import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ScreenshotCaptureService {
  private apiViewport = '1440x1000';
  private apiWidth = '2000';
  private httpService = inject(HttpClient);

  captureScreenshot(url: string): Observable<Blob> {
    const md5SecretKey = CryptoJS.MD5(url + environment.screenshotApiSecretKey).toString();
    const completeUrl = `/api/capture?access_key=${environment.screenshotApiAccessKey}&url=${encodeURIComponent(url)}&viewport=${this.apiViewport}&width=${this.apiWidth}&secret_key=${md5SecretKey}&format=PNG`;

    return this.httpService.get(completeUrl, { responseType: 'blob' }).pipe(
      catchError(error => {
        console.error('HTTP Error', error);
        return throwError(error);
      })
    );
  }
}
