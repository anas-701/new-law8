import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { EMPTY, Observable, catchError, finalize, tap, throwError } from "rxjs";
import { HandleErrorService } from "../services/handle-error-service";
import { LoadingService } from "../services/loading.service";

// import * as Sentry from '@sentry/angular';

export const HttpErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const _handleErrorService = inject(HandleErrorService);
  const _loading = inject(LoadingService);


  // Show loading indicator
 _loading.show();

  return next(req).pipe(
    tap({
      next: (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Success response handling
          _handleErrorService.handleError(event); // Handle successful response as needed
        }
      },
      error: (error: HttpErrorResponse) => {
        // Log error for debugging purposes (optional)
        // 
      },
    }),
    catchError((error: HttpErrorResponse) => {
      _handleErrorService.handleError(error);
    //  return throwError(() => error); // Pass the error forward
    return throwError(() => error);
   }),
    finalize(() => {
      // Hide loading indicator when request completes or fails
       _loading.hide();
    })
  );
};
