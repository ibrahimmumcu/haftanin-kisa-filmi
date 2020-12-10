import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './services/app.service';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HeaderModule } from '../app/components/header/header.module';
import { FooterModule } from '../app/components/footer/footer.module';

export function initializeConfig(appService: AppService) {
  return () => appService.loadConfigFile();
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderModule,
    FooterModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    AppService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeConfig,
      deps: [AppService],
      multi: true
    }
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
