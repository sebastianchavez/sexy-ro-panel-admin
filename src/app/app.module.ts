import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { InterceptorService } from './services/interceptors/interceptor.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
const socketIoUrl: string = environment.socketIoUrl
const config: SocketIoConfig = { url: socketIoUrl, options: {transports: ['websocket'], upgrade: false } };
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
