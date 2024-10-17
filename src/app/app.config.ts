import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { TodoService } from './services/todo.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideClientHydration(),
    importProvidersFrom([ BrowserModule ]),
    { provide: TodoService, useClass: TodoService }
  ]
};
