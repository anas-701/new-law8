import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export class MultiTranslateHttpLoader implements TranslateLoader {
  constructor(
    private httpClient: HttpClient,
    public resources: { prefix: string; suffix: string }[]
  ) {}

  public getTranslation(lang: string): Observable<any> {
    return of(null).pipe(
      switchMap(() => new Observable<any>(observer => {
        setTimeout(() => {
          const requests = this.resources.map(({ prefix, suffix }) =>
            this.httpClient.get(`${prefix}${lang}${suffix}`).pipe(
              catchError((error: HttpErrorResponse) => {
                console.error('Error fetching translation:', error);
                if (error.status === 0) {
                  // Handle network errors or status 0 errors
                  return of({}); // Return an empty object
                } else {
                  // For other errors, re-throw the error
                  return throwError(error);
                }
              })
            )
          );

          forkJoin(requests).subscribe(
            (responses: any[]) => {
              observer.next(Object.assign({}, ...responses));
              observer.complete();
            },
            error => observer.error(error)
          );
        }, 100); // Delay of 1000 milliseconds (1 second)
      }))
    );
  }
}
