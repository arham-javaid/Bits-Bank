import { NgModule } from '@angular/core'; // Correct import for @NgModule decorator
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent} from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgetpasswordComponent } from './auth/forgetpassword/forgetpassword.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { UserAuthService } from './Services/user-services';
import { WrapHttpService } from './Services/wrap-http.service';
import { CommonModule } from '@angular/common';
import { DeleteConfirmationComponent } from './Shared/delete-confirmation/delete-confirmation.component';
import { PaginationComponent } from './Shared/pagination/pagination.component';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetpasswordComponent,
    UserComponent,
    PaginationComponent,
    DeleteConfirmationComponent, 
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    ToastrModule.forRoot(),
  ],
  providers: [
    UserAuthService,
    WrapHttpService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}