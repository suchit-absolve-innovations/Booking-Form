import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, debounceTime, catchError, switchMap } from 'rxjs/operators';
import { ContentService } from './content.service';

export function emailUniqueValidator(contentService: ContentService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null); // No validation needed for empty input
    }

    return contentService.uniqueEmail({ email: control.value }).pipe(
      debounceTime(500), // Delay to avoid excessive requests
      map((response) => {
        return response.status ? null : { emailAlreadyExists: true }; // Return error if email exists
      }),
      catchError(() => of(null)) // Handle errors gracefully
    );
  };
}
