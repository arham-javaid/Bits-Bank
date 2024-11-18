import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, of } from 'rxjs';
import { HttpConfig } from './http-config';
import { WrapHttpService } from './wrap-http.service';
import { StorageService } from './storage.service';
import { AuthService } from '../Services/auth.service';



@Injectable({
    providedIn: 'root'
})
export class UserAuthService {
    private baseUrl = HttpConfig.mainApiUrl() + '/auth';
  apiUrl: string | undefined;
    constructor(private http: WrapHttpService) { }

  logIn(data: object): Promise<any> {
    return lastValueFrom(this.http.post(`${this.baseUrl}/auth/login`, data));
  }

  loginByOtp(data: object, otp:string): Promise<any> {
    return lastValueFrom(this.http.post(`${this.baseUrl}/login/${otp}`, data));
  }

  resetPassword(email: any, password: any) {
    return lastValueFrom(this.http.post(`${this.baseUrl}/reset-password`, {email, password}));
  }

  forgotPassword(data: any) {
    return lastValueFrom(this.http.post(`${this.baseUrl}/forgot-password`, data));
  }
  post(arg0: string, data: any) {
    throw new Error('Method not implemented.');
  }

  forgotPasswordVerify(verification: object) {
    return lastValueFrom(this.http.post(`${this.baseUrl}/forgot-password-verify`,  verification ));
  }

  getUsers(conditions?: object): Promise<any> {
    return lastValueFrom(this.http.get(`${this.baseUrl}/alluser` + WrapHttpService.objToQuery(conditions)));
  }
  getLoggedUser() {
    return StorageService.getItem(AuthService.LOGGED_USER_KEY);
  }
}