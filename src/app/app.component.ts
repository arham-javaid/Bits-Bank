import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './auth/login/login.component'; 
import { MainComponent } from './body/body.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { UserComponent } from './user/user.component';
import { LogBookListComponent } from './log-book-list/log-book-list.component';
import { AuthService } from './auth.service';
import { PHeaderComponent } from "./public/p-header/p-header.component";
import { PFooterComponent } from "./public/p-footer/p-footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ReactiveFormsModule,
    MainComponent,
    AccountDetailsComponent,
    UserComponent,
    PHeaderComponent,
    PFooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hideHeaderFooter: boolean = false;
  isPublic: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkHideHeaderFooter(event.url);
        this.isPublic = this.isPublicRoute(event.url);
      }
    });
  }

  private checkHideHeaderFooter(url: string): void {
    const hideOnLoadRoutes = ['login', 'accountotp', 'forget', 'change', 'otp' , 'register'];
    this.hideHeaderFooter = hideOnLoadRoutes.some(route => url.includes(route));
  }

  private isPublicRoute(url: string): boolean {
    // Define routes where app-p-header should be shown
    const publicRoutes = ['/portal', '/accountotp' ,'/log-book', '/dashboard'];
    return publicRoutes.some(route => url.startsWith(route));
  }
}
