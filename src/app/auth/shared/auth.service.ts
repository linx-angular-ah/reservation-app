import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, map } from 'rxjs';
import moment from 'moment';

const jwt = new JwtHelperService();

class DecodedToken {
  exp: number = 0;
  userID: string = '';
  username: string = '';
}

@Injectable()
export class AuthService {
  private decodedToken: any
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // this.decodedToken = JSON.parse(localStorage.getItem('app-meta')) || new DecodedToken();
    const appMeta = localStorage.getItem('app-meta');
    this.decodedToken = appMeta ? JSON.parse(appMeta) : new DecodedToken();
  }

  isAuthenticated() {
    return moment().isBefore(moment.unix(this.decodedToken.exp));
  }

  getToken() {
    return localStorage.getItem('app-token')
  }

  register(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/register', userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/login', userData).pipe(
      map((token: any) => {
        this.decodedToken = jwt.decodeToken(token);
        localStorage.setItem('app-token', token);
        localStorage.setItem('app-meta', JSON.stringify(this.decodedToken));
        return token;
      })
    );
  }

  logout() {
    localStorage.removeItem('app-token');
    localStorage.removeItem('app-meta');
    this.decodedToken = new DecodedToken();
    this.router.navigate(['/'])
  }
  
}
