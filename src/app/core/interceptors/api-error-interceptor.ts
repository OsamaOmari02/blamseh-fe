import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const apiErrorInterceptor: HttpInterceptorFn = (request, next) =>
  next(request).pipe(
    catchError((error: unknown) =>
      throwError(() =>
        error instanceof HttpErrorResponse ? new Error(describeHttpError(error)) : error,
      ),
    ),
  );

function describeHttpError(error: HttpErrorResponse): string {
  if (error.status === 0) return 'No connection. Check your internet and try again.';
  if (error.status === 429) return 'Too many requests. Try again in a moment.';
  if (error.status >= 500) return 'The weather service is having trouble. Try again later.';
  return `Request failed (${error.status})`;
}
