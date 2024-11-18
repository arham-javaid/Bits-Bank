import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { HttpConfig } from './http-config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static readonly LOGGED_USER_KEY = 'logbook-user';
  static loggedUser = null;
  private baseUrl = HttpConfig.mainApiUrl() + '/User';
  
    private apiUrl = HttpConfig.mainApiUrl();
    
    constructor(private http: HttpClient) {}
  private static logStatus = new Subject<boolean>();
  public static getLogStatus(): Observable<any> {
    return this.logStatus.asObservable();
  }

  static isLogged() {
    const loggedUser = StorageService.getItem(AuthService.LOGGED_USER_KEY);
    this.loggedUser = loggedUser;
    // const isLogged = loggedUser && new Date(loggedUser.exp).getTime() > Math.round((new Date()).getTime() / 1000);
    const isLogged = loggedUser && true;
    if (!isLogged) {
      this.removeLoggedUser();
    }
    return isLogged;
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
        email: userAllDetails.email,
        RoleId: userAllDetails.RoleId,
        role: userAllDetails.role,
        balance: userAllDetails.balance,
        Permissions:userAllDetails.permissions
      },
      permissions: [],
      tokenInfo: ''
    };
     // TODO;
    // const tokenDetails = JSON.parse(atob(userAllDetails.accessToken.split('.')[1]));
    // tokenWithDetail[`exp`] = tokenDetails.exp;
    // tokenWithDetail[`iat`] = tokenDetails.iat;
    tokenWithDetail[`tokenInfo`] = userAllDetails.accessToken;
     if (userAllDetails.permissions) {
      tokenWithDetail[`permissions`] = JSON.parse(JSON.stringify(userAllDetails.permissions));
      console.log(tokenWithDetail[`permissions`],"<<<<<-----");
      
    }
    StorageService.setItem(AuthService.LOGGED_USER_KEY, tokenWithDetail);
    this.logStatus.next(true);
  }
  

  static removeLoggedUser() {
    StorageService.removeItem(AuthService.LOGGED_USER_KEY);
    this.logStatus.next(false);
    return true;
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

  // static checkPermission(moduleIdentifier: string, actionIdentifier?: string): boolean {
  //   const user = this.getLoggedUser();
  //   // If user not exist return false.
  //   if (!user || !user.permissions || !user.permissions.length) {
  //     return false;
  //   }

    // const module = _.find(user.permissions, { identifier: moduleIdentifier });
    // // If module not found in permissions return false.
    // if (!module) {
    //   return false;
    // }

    // If module and actionIdentifier is provided to check.
    // if (moduleIdentifier && actionIdentifier) {
    //   const moduleAction = _.find(module.actions, { identifier: actionIdentifier});
    //   if (!moduleAction) {
    //     return false;
    //   }
    // }

    // return true;
  // }

  // signUp(data) {
  //   return this.post(this.apiUrl + '/signup', data);
  // }
  
forgetPassword(email:string): Observable<any> {
  const url = `${this.baseUrl}/forgotpass`;
  return this.http.post(url, { email });
}



  signIn(user: { email: string; password: string }): Observable<any> {
    const url = `${this.baseUrl}/login`; 
    return this.http.post(url, user );
  }
}