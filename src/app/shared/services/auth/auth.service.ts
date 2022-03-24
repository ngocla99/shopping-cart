import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  DeviceData,
  UserData,
  UserInfo,
  UserSignIn,
  UserSignUp,
  UserStore,
} from '../../models/user.model';
import { SwalAlertService } from '../others/swal-alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://137.184.207.13:5000/v1';
  private readonly DEVICE_ID = this.generateDeviceId();

  private tokenExpirationTimer: any;
  user = new BehaviorSubject<UserStore | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private swalAlert: SwalAlertService
  ) {}

  // Sign up the account
  signUp(user: UserSignUp) {
    return this.http.post<any>(`${this.API_URL}/auth/register`, user).pipe(
      map((data) => data.data.user),
      tap((userInfo: UserInfo) => {
        //... FIXME
        console.log(userInfo);
      })
    );
  }

  // Sign in the account
  signIn(user: UserSignIn) {
    const userSignIn = { ...user, deviceId: this.DEVICE_ID };

    return this.http.post<any>(`${this.API_URL}/auth/login`, userSignIn).pipe(
      map((data) => data.data),
      tap((userData: UserData) => {
        this.handleAuthentication(userData);
      })
    );
  }

  // Logout the account
  logout() {
    const refreshToken = this.getUserInLocalStorage().refreshToken;

    const deviceData = {
      refreshToken: refreshToken,
      deviceId: this.DEVICE_ID,
    };

    this.user.next(null);

    this.deleteUserInLocalStorage();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;

    return this.http.post<any>(`${this.API_URL}/auth/logout`, deviceData);
  }

  // refreshToken to get access token if it is expired
  refreshToken(refreshToken: string) {
    const deviceData = {
      deviceId: this.DEVICE_ID,
      refreshToken: refreshToken,
    };

    console.log('OLD RefreshToken', refreshToken);
    console.log('DEVICE_ID', this.DEVICE_ID);

    return this.http.post<any>(
      `${this.API_URL}/auth/refresh-tokens`,
      deviceData
    );
  }

  // get Password
  forgotPassword(email: { email: string }) {
    return this.http.post<any>(`${this.API_URL}/auth/forgot-password`, email);
  }

  // Need add authentication
  sendVerificationEmail() {
    const deviceId = { deviceId: this.DEVICE_ID };

    return this.http.post<any>(
      `${this.API_URL}/auth/send-verification-email`,
      deviceId
    );
  }

  // Need add authentication to query params TODO
  verifyEmail(url: string) {
    const token = 'token=' + url.split('=')[1];
    const deviceId = { deviceId: this.DEVICE_ID };

    this.swalAlert.titleAlertTimer('center', null, 'Verifying email ...');
    this.http
      .post<any>(`${this.API_URL}/auth/verify-email?${token}`, deviceId)
      .subscribe(
        (data) => {
          this.swalAlert.textAlert('success', data.message);
        },
        (error) => {
          const message = error.error.message;
          this.swalAlert.textAlert('error', message);
        }
      );
  }

  // Auto login when reload page if user is logged in
  autoLogin() {
    const user = this.getUserInLocalStorage();

    if (!user) {
      return;
    }

    const expiredDate = user.expiredAccessDate;
    const expiresIn = new Date(expiredDate).getTime() - new Date().getTime();

    if (!expiredDate || expiresIn < 0) {
      return;
    }

    this.user.next(user);
    // this.autoLogout(expiresIn);
  }

  // Auto logout when time expired
  autoLogout(expiresIn: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
      this.router.navigate(['/auth/sign-in']);
      this.swalAlert.textAlert('error', 'Time out');
    }, expiresIn);
  }

  private handleAuthentication(userData: UserData) {
    const user = {
      id: userData.user.id,
      username: userData.user.username,
      role: userData.user.role,
      isEmailVerified: userData.user.isEmailVerified,
      accessToken: userData.tokens.access.token,
      expiredAccessDate: new Date(userData.tokens.access.expires),
      refreshToken: userData.tokens.refresh.token,
      expiredRefreshDate: new Date(userData.tokens.refresh.expires),
    };

    const expiresIn =
      new Date(user.expiredAccessDate).getTime() - new Date().getTime();

    this.user.next(user);
    this.saveUserToLocalStorage(user);
    // this.autoLogout(expiresIn);
  }

  isSignedIn(): boolean {
    const user = this.getUserInLocalStorage();
    if (!user) {
      return false;
    }
    return true;
  }

  isAdmin(): boolean {
    const user = this.getUserInLocalStorage();

    if (!user) {
      return false;
    }

    const isAdmin = user.role === 'admin' ? true : false;
    return isAdmin;
  }

  // Store info user into local storage to get Token
  saveUserToLocalStorage(user: any) {
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  // Delete info user into local storage
  deleteUserInLocalStorage() {
    window.localStorage.removeItem('user');
  }

  // Get UserData in LocalStorage
  getUserInLocalStorage(): UserStore {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  // Create random Device Id for each Device or browser
  generateDeviceId(): string {
    const navigator_info = window.navigator;
    const screen_info = window.screen;
    let uid = navigator_info.mimeTypes.length + '';
    uid += navigator_info.userAgent.replace(/\D+/g, '');
    uid += navigator_info.plugins.length;
    uid += screen_info.height || '';
    uid += screen_info.width || '';
    uid += screen_info.pixelDepth || '';

    return uid;
  }
}
