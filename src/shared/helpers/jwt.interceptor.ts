import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

//     return next.handle(request).pipe(
//       tap(
//         event => {
//           if (event instanceof HttpResponse) {
//           }
//         },
//         error => {
//           // 401 means Unauthorised
//           if (error.status === '401' || error.status === 401) {
//             console.error(error.status);
//             console.error(error.message);
//             localStorage.removeItem('currentUser');
//           }
//         }
//       )
//     );
//   }

// }
