import { Injectable, Inject, } from '@angular/core';
import { Observable, Subject, lastValueFrom, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpConfig } from './http-config';
import { WrapHttpService } from './wrap-http.service';
import { HttpParams } from '@angular/common/http';
import { FrontendGetAccountDto } from './get-account-interface';
import { StorageService } from './storage.service';
import { AuthService } from '../Services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserAuthService {
  static loggedUser = null;
  static LOGGED_USER_KEY(LOGGED_USER_KEY: any, tokenWithDetail: { data: { id: any; name: any; email: any; RoleId: any; role: any; balance: any; Permissions: any; }; permissions: never[]; tokenInfo: string; }) {
    throw new Error('Method not implemented.');
  }
    private baseUrl = HttpConfig.mainApiUrl() + '/auth';
    private apiUrl = HttpConfig.mainApiUrl();
    

    constructor(@Inject(WrapHttpService) private http: WrapHttpService,) { }
    private static logStatus = new Subject<boolean>();
    
    signUp(user: { data:object }): Observable<any> {
        const url = `${this.baseUrl}/signup`;
        return this.http.post(url, user);
      }
      
      static isLogged() {
        const loggedUser = StorageService.getItem(AuthService.LOGGED_USER_KEY);
        this.loggedUser = loggedUser;
        // TODO; If token expired remove the session.
        // const isLogged = loggedUser && new Date(loggedUser.exp).getTime() > Math.round((new Date()).getTime() / 1000);
        const isLogged = loggedUser && true;
        if (!isLogged) {
          this.removeLoggedUser();
        }
        return isLogged;
      }
    
     getLoggedUser() {
        return StorageService.getItem(AuthService.LOGGED_USER_KEY);
      }
      
      logIn(data: object): Promise<any> {
        return lastValueFrom(this.http.post(`${this.baseUrl}/login`, data)).then(response => {
          // Save the logged-in user's details in local storage
          AuthService.setLoggedUser(response);
          console.log(response , " responce");
          return response;
          
        }).catch(error => {
          console.error('Login error:', error);
          throw error;
        });
      }
   

  static getLoggedUser() {
    return StorageService.getItem(AuthService.LOGGED_USER_KEY);
  }
    static setLoggedUser(userAllDetails: any) {
      console.log(userAllDetails);
      
      const tokenWithDetail = {
        data: {
          id: userAllDetails.id,
          name: userAllDetails.name,
          // lName: userAllDetails.lName,
          email: userAllDetails.email,
          RoleId: userAllDetails.RoleId,
          role: userAllDetails.role,
          balance: userAllDetails.balance,
          Permissions:userAllDetails.permissions
        },
        permissions: [],
        tokenInfo: ''
      };
      // const tokenDetails = JSON.parse(atob(userAllDetails.accessToken.split('.')[1]));
      // tokenWithDetail[`exp`] = tokenDetails.exp;
      // tokenWithDetail[`iat`] = tokenDetails.iat;
      tokenWithDetail[`tokenInfo`] = userAllDetails.accessToken;
      if (userAllDetails.permissions) {
        tokenWithDetail[`permissions`] = JSON.parse(JSON.stringify(userAllDetails.permissions));
      }
      StorageService.setItem(AuthService.LOGGED_USER_KEY, tokenWithDetail);
      this.logStatus.next(true);
    }
  
    static checkPermission(actionIdentifier: string | string[]): boolean {
      const user = this.getLoggedUser();
      // If user not exist or doesn't have permissions, return false.
      if (!user || !user.permissions || !user.permissions?.length) {
        return false;
      }
  
      if (typeof actionIdentifier === 'string') {
        actionIdentifier = [actionIdentifier];
      }
  
      return actionIdentifier.some(permission => user.permissions.includes(permission));
    }
  
    static removeLoggedUser() {
      StorageService.removeItem(AuthService.LOGGED_USER_KEY);
      this.logStatus.next(false);
      return true;
    }

  
    resetPassword(data:object) {
      return lastValueFrom(this.http.post(`${this.baseUrl}/reset-password`, data));
    }

    forgotPassword(data: any): Promise<any> {
      return lastValueFrom(
        this.http.post(`${this.baseUrl}/forgot-password`, data).pipe(
          catchError((error) => {
            console.error('Error in forgotPassword:', error);
            return of(null); // Return null or any fallback value you prefer
          })
        )
      );
    }

    forgotPasswordVerify(verification: object): Promise<any> {
        return lastValueFrom(
            this.http.post(`${this.baseUrl}/forgot-password-verify`, verification).pipe(
                catchError((error) => {
                    console.error('Error in forgotPasswordVerify:', error);
                    return of(null);
                })
            )
        );
    }

    accouuntVerify(verification: object): Promise<any> {
      return lastValueFrom(
          this.http.post(`${this.baseUrl}/verify-otp`, verification).pipe(
              catchError((error) => {
                  console.error('Error in forgotPasswordVerify:', error);
                  return of(null);
              })
          )
      );
  }


    loginByOtp(data: object, otp: string): Promise<any> {
        return lastValueFrom(
            this.http.post(`${this.baseUrl}/login/${otp}`, data).pipe(
                catchError((error) => {
                    console.error('Error in loginByOtp:', error);
                    return of(null);
                })
            )
        );
    }

    createUser(data: object): Promise<any> {
        return lastValueFrom(
            this.http.post(`${this.apiUrl}/accounts`, data).pipe(
                catchError((error) => {
                    console.error('Error in creating Account:', error);
                    return of(null);
                })
            )
        );
    }
    
    getUsers(conditions?: object): Promise<any> {
        return lastValueFrom(this.http.get(`${this.baseUrl}/alluser` + WrapHttpService.objToQuery(conditions)));
      }

    getUndeletedAccounts(): Observable<any[]> {
        const params = new HttpParams().set('isDeleted', 'false');
    
        return this.http.get(`${this.apiUrl}/accounts`, { params });
      }

    getUserById(userId: string): Observable<any> {
        const url = `${this.apiUrl}/user/${userId}`;
        return this.http.get(url);
    }
    async updateUser(userId: string, userData: any): Promise<any> {
        const url = `${this.apiUrl}/user/${userId}`;
        console.log(url);

        return lastValueFrom(this.http.patch(url, userData));
    }

    deleteRecord(id: string): Promise<any> {
        return lastValueFrom(this.http.delete(`${this.apiUrl}/accounts/${id}`));
      }
      
    getAccountsBySearchTerm(filter: any): Observable<any[]> {
        const apiUrlWithSearchTerm = `${this.apiUrl}/accounts`;
        return this.http.get(`${this.apiUrl}/accounts`, { params: filter });
      }
      getUserBalance(id: string): Observable<any> {
        const url = `${this.baseUrl}/${id}/balance`; // Correct API endpoint for user balance
        return this.http.get(url); // Send the GET request using the userId
      }
    }
