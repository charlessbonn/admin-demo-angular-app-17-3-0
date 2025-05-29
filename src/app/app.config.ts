import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './myinterceptors/auth.interceptor';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { CustomTranslateLoader } from './utils/translate-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    ),
    provideTranslateService({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new CustomTranslateLoader(http),
        deps: [HttpClient],
      },
    }),
  ]
};
