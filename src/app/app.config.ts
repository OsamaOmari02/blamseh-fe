import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { apiErrorInterceptor } from '@core/interceptors/api-error-interceptor';
import { ConversationRepository } from '@data/conversation-repository';
import { MockConversationRepository } from '@data/mock-conversation-repository';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([apiErrorInterceptor])),
    { provide: ConversationRepository, useClass: MockConversationRepository },
  ],
};
