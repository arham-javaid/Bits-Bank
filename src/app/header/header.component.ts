import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../Services/user-services';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink , CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private readonly router: Router , private UserService: UserAuthService ) { }


  userObject: any = null;
  xmlUrl: string = "";
  currentUserName: string = "";
  currentUserEmail: string = "";
  isNavbarOpen: boolean = false;
  showUserMenu: boolean = false;
  showCompany: boolean = false;
  isDropdownOpen = false;

  permissions = {
    Transaction: false,
    Account: false,
    Report: false,
    User: false,
    // Reports: false,
    // feed: false,
    // Support: false,
    // Company: false,
  };


  ngOnInit(): void {
      this.currentUser();

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      // this.showUserMenu = UserAuthService.checkPermission(["UserCreate", "UserReturn", "UserDelete", "UserUpdate"]);
      // this.showCompany = UserAuthService.checkPermission(["TranscationReturn"]);
      this.setPermissions();
    });

    this.setPermissions();
  }
  private currentUser(){
    const currentUser = UserAuthService.getLoggedUser()
    this.currentUserName = currentUser.data.name
    this.currentUserEmail = currentUser.data.email   
  }


  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }


  logout() {
    UserAuthService.removeLoggedUser();
    this.router.navigate(['/login']);
  }

  private setPermissions() {
    this.permissions = {
      // tasks: UserAuthService.checkPermission(['TaskReturn', 'TaskUpdate', 'TaskDelete']),
      // mediaAsset: UserAuthService.checkPermission(['MediaAssetCreate', 'MediaAssetReturn', 'MediaAssetUpdate', 'MediaAssetDelete']),
      // accessKey: UserAuthService.checkPermission(['AccessKeyCreate', 'AccessKeyReturn', 'AccessKeyUpdate', 'AccessKeyDelete']),
      // brand: UserAuthService.checkPermission(['BrandCreate', 'BrandReturn', 'BrandUpdate', 'BrandDelete']),
      User: UserAuthService.checkPermission(['UserCreate', 'UserReturn', 'UserUpdate', 'UserDelete']),
      Report: UserAuthService.checkPermission(['ReportCreate', 'ReportReturn', 'ReportUpdate', 'ReportDelete']),
      Account: UserAuthService.checkPermission(['AccountCreate', 'AccountReturn', 'AccountUpdate', 'AccountDelete']),
      Transaction: UserAuthService.checkPermission(["TransactionCreate", "TransactionReturn", "TransactionDelete", "TransactionUpdate"]),
    };
  }
}

