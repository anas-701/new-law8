import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { USER } from '../utilities/defines';
import { StorageService } from '../services/storage.service';
import { LanguageService } from '../services/language.service';

export const AppHttpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const _storageService = inject(StorageService);
  const _languageService = inject(LanguageService);

  const token = _storageService.getStorage(USER)?.token;


  let headersToAppend: any = {};

  if (token) {
    headersToAppend['Authorization'] = `Bearer ${token}`;
  }

  if (!(req.body instanceof FormData)) {
    headersToAppend['Content-Type'] = 'application/json';


  }

  const preferredLanguage = _languageService.getSelectedLanguage();
  if (preferredLanguage) {
    headersToAppend['Accept-Language'] = preferredLanguage;
  }

  let modifiedReq = req.clone({
  setHeaders: headersToAppend,
  });

  return next(modifiedReq);
};
