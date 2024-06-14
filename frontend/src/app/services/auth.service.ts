import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, interval, Subscription, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public host = environment.host
  private baseUrl: string = `${this.host}:8070/api/Client`;
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private tokenRefreshSubject = new Subject<void>();
  private checkTokenInterval!: Subscription;
  private sessionExpire: boolean = false;
  private profileInfo: any;
  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.initTokenCheck();
  }

  // Token Management
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
    this.tokenSubject.next(tokenValue);
    this.tokenRefreshSubject.next();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getTokenRefreshes(): Observable<void> {
    return this.tokenRefreshSubject.asObservable();
  }

  getTokenUpdates(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  // Authentication
  login(loginObj: any , isFacebookLogin:boolean): Observable<any> {
    return this.http.post<any>(`${this.host}:8070/api/Auth/authenticate?isFacebookLogin=${isFacebookLogin}`, loginObj).pipe(take(1));
}

  register(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, formData).pipe(take(1));
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigateByUrl('/login');
    if (this.checkTokenInterval) {
      this.checkTokenInterval.unsubscribe();
      this.initTokenCheck();
    }
  }

  changePassword(newPassword: string): Observable<any> {
    const userId = this.getIdFromToken();
    const url = `${this.baseUrl}reset-password`;
    const body = { userId: userId, newPassword: newPassword };
    return this.http.post<any>(url, body).pipe(take(1));
  }

  // Token Validation
  isLoggedIn(): boolean {
    const token = this.getToken();
    const jwtHelper = new JwtHelperService();
    return !!token && !jwtHelper.isTokenExpired(token);
  }

  decodedToken() {
    const token = this.getToken();
    if (token) {
      const jwtHelper = new JwtHelperService();
      return jwtHelper.decodeToken(token);
    }
    return null;
  }

  getIdFromToken() {
    const decoded = this.decodedToken();
    return decoded ? decoded.Id : null;
  }
  getRoleFromToken() {
    const decoded = this.decodedToken();
    return decoded ? decoded.Role : null;
  }

  // Profile Management
  setProfileInfo(info: any) {
    this.profileInfo = info;
  }

  getProfileInfo(): any {
    return this.profileInfo;
  }

  // Data Management
  setData(data: any) {
    this.dataSubject.next(data);
  }

  getData() {
    return this.dataSubject.value;
  }

  // Token Checking
  private initTokenCheck() {
    this.checkTokenInterval = interval(3600000).subscribe(async () => {
      if (!this.isLoggedIn()) {
        this.logout();
      }
    });
  }
}
