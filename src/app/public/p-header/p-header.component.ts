import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../../Services/user-services';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-p-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './p-header.component.html',
  styleUrls: ['./p-header.component.css'] 
})
export class PHeaderComponent {
  constructor(
    private readonly router: Router, 
    private UserService: UserAuthService,
    private route:ActivatedRoute
  ) { }

  userObject: any = null;
  xmlUrl: string = "";
  currentUserName: string = "";
  currentUserId: string = "";
  currentUserEmail: string = "";
  isNavbarOpen: boolean = false;
  showUserMenu: boolean = false;
  showCompany: boolean = false;
  isDropdownOpen = false; 
  isScrolled = false;
  itemToDeleteId: string = '';
  transactionId: string = '';

  permissions = {
    Transaction: false,
    Account: false,
    Report: false,
    User: false,
    logBook: false,
  };

  ngOnInit(): void {
    // Subscribing to route parameters
    this.route.paramMap.subscribe((params) => {
      this.currentUserId = params.get('id') ?? ''; 
    console.log(this.currentUserId , "id");
    // Corrected closing parenthesis
    });
    

 
    // Subscribing to router events to handle navigation changes
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.setPermissions(); // Ensure setPermissions is called when navigation ends
    });
  
    // Calling methods after initialization
    this.currentUser();
    this.setPermissions();
  }
  

  private currentUser() {
    const currentUser = UserAuthService.getLoggedUser();
    this.currentUserId = currentUser.data.id;  
    this.currentUserName = currentUser.data.name;
    this.currentUserEmail = currentUser.data.email;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; 
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  logout() {
    UserAuthService.removeLoggedUser();
    this.router.navigate(['/p-login']);
  }

  private setPermissions() {
    this.permissions = {
      User: UserAuthService.checkPermission(['UserCreate', 'UserReturn', 'UserUpdate', 'UserDelete']),
      Report: UserAuthService.checkPermission(['ReportCreate', 'ReportReturn', 'ReportUpdate', 'ReportDelete']),
      Account: UserAuthService.checkPermission(['AccountCreate', 'AccountReturn', 'AccountUpdate', 'AccountDelete']),
      Transaction: UserAuthService.checkPermission(["TransactionCreate", "TransactionReturn", "TransactionDelete", "TransactionUpdate"]),
      logBook: UserAuthService.checkPermission(["logBookCreate", "logBookReturn", "logBookDelete", "logBookUpdate"]),
    };
  }
  detailLog(currentUserId: string) {
    this.router.navigate(['/accountDetail', currentUserId]);
  }
}
