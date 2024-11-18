import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './body/body.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { HomeComponent } from './home/home.component';
import { ForgetpasswordComponent } from './auth/forgetpassword/forgetpassword.component';
import { ChangePasswordComponent } from './auth/changepassword/changepassword.component';
import { AccountListComponent } from './account-list/account-list.component';
import { ReportsComponent } from './reports/reports.component';
import { LogBookComponent } from './log-book/log-book.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { OtpComponent } from './auth/otp/otp.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth.gaurd';
import { PHomeComponent } from './public/p-home/p-home.component';
import { PKonnectComponent } from './public/p-konnect/p-konnect.component';
import { PLoginComponent } from './public/p-Auth/p-login/p-login.component';
import { PRegisterComponent } from './public/p-Auth/p-register/p-register.component';
import { PFreelancerComponent } from './public/p-freelancer/p-freelancer.component';
import { TransactionModalComponent } from './transaction-modal/transaction-modal.component';
import { PSavingaccountComponent } from './public/p-savingaccount/p-savingaccount.component';
import { PDigitalComponent } from './public/p-digital/p-digital.component';
import { AccountOtpComponent } from './public/p-Auth/account-otp/account-otp.component';
import { PCurrentComponent } from './public/p-current/p-current.component';
import { PBusinessComponent } from './public/p-business/p-business.component';
import { PAsaanComponent } from './public/p-asaan/p-asaan.component';

export const routes: Routes = [
//auth    
    {path: "portal",  component: HomeComponent, canActivate: [AuthGuard]},
    {path: "Logbook", component:MainComponent},
    {path: "accountDetail", component:AccountDetailsComponent},
    {path: "accountDetail/:id", component:AccountDetailsComponent},
    {path: "user-form", component:UserComponent},
    {path: "Accounts", component:AccountListComponent},
    {path: "user-form/:id", component: UserComponent},
    {path: "log-book",component:LogBookComponent},
    {path: "dashboard",component:DashboardComponent},
    {path: "log-book/:id",component:LogBookComponent},
    {path: "transactions",component:TransactionsComponent},
    {path: "reports", component: ReportsComponent},
    {path: "signup",component:SignUpComponent},
    {path: "home",component:HomeComponent},
    {path: "transactionmodal",component:TransactionModalComponent},
//auth
    {path: "otp",component:OtpComponent},
    {path: "forget", component:ForgetpasswordComponent},
    {path: "change", component:ChangePasswordComponent},
    {path: "login" , component: LoginComponent},
    {path: "signup" , component: SignUpComponent},
//public 
    {path:"",component:PHomeComponent},
    {path:"p-konnect",component:PKonnectComponent},
    {path:"p-login",component:PLoginComponent},
    {path:"register",component:PRegisterComponent},
    {path:"accountotp",component: AccountOtpComponent},
    {path:"p-freelancer",component:PFreelancerComponent},
    {path:"p-savingaccount",component:PSavingaccountComponent},
    {path:"p-digital",component:PDigitalComponent},
    {path:"p-current",component:PCurrentComponent},
    {path:"p-business",component:PBusinessComponent},
    {path:"p-asaan",component:PAsaanComponent}
];

