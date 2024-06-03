import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { Login } from '../models/login';
import { ApiEndPoint } from 'src/app/api-end-point';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Login>;
  public currentUser: Observable<Login>;
  constructor(private http: HttpClient,
    private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Login>(JSON.parse(localStorage.getItem('currentUser') || '{}'));

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Login {
    return this.currentUserSubject.value;
  }


  login(user: Login) {

    return this.http.post<any>(environment.apiUrl + ApiEndPoint.login, user)
      // tslint:disable-next-line: no-shadowed-variable
      .pipe(map(user => {
        if (user.data) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('loginRole', user.data.role);
         localStorage.setItem('loginId', user.data.customerId);
         localStorage.setItem('token', user.data.token);
         localStorage.setItem('fname', user.data.customerFname);
         localStorage.setItem('lname', user.data.customerLname);
          this.currentUserSubject.next(user);
        } else {
          this.router.navigateByUrl('/login')
        }
        return user;
      }));
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
  }


  registerAccount(data: any) {
    return this.http.post<any>(environment.apiUrl + ApiEndPoint.register, data) 
    .pipe(map(user => {
      if (user.data) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('loginRole', user.data.role);
       localStorage.setItem('loginId', user.data.customerId);
       localStorage.setItem('token', user.data.token);
       localStorage.setItem('fname', user.data.customerFname);
       localStorage.setItem('lname', user.data.customerLname);
        this.currentUserSubject.next(user);
      } else {
        this.router.navigateByUrl('/login')
      }
      return user;
    }));
  }


}
