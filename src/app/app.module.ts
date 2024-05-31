import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DownloadLinkComponent } from './components/download-link/download-link.component';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule, AppRoutingModule, DownloadLinkComponent, HttpClientModule, ToastrModule.forRoot(), FormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
