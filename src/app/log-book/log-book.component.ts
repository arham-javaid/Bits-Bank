import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { UserAuthService } from '../Services/user-services';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { TransactionService } from '../Services/transaction-service copy';
import { TransactionModalComponent } from "../transaction-modal/transaction-modal.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log-book',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, DatePipe, RouterLink, TransactionModalComponent],
  templateUrl: './log-book.component.html',
  styleUrls: ['./log-book.component.css']
})
export class LogBookComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  users: any[] = [];
  TransAccounts : any = {};
  commonDate: Date | null = null;
  public creditForm!: FormGroup;
  public transactionForm!: FormGroup;
  transactionType: string = '';
  transactionId: string | null = null;
  clientLoggedInRole: string = '';
  userId: string = '';
  showTransactionModal: boolean = false;
  accountName: string = '';
  currentUserBalance: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userAuthService: UserAuthService,
    private datePipe: DatePipe,
    private transactionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    const loggedUser = this.userAuthService.getLoggedUser();
    this.clientLoggedInRole = loggedUser.data?.role;
    this.userId = loggedUser.data?.id;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && this.userId) {
      this.getUpdatedUserBalance();
    }
  }

  getUpdatedUserBalance(): void {
    this.userAuthService.getUserBalance(this.userId).subscribe(
      (response) => {
        console.log('Updated balance:', response);
        this.currentUserBalance = response.balance
        console.log(this.currentUserBalance , "bal");
        
      },
      (error) => {
        console.error('Error fetching balance:', error);
      }
    );
  }
  


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.transactionId = params['id'];
      if (this.transactionId) {
        this.populateForm(this.transactionId);
      }
    });
    this.getUpdatedUserBalance()
    this.fetchUsers();

    this.creditForm = this.formBuilder.group({
      creditName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      creditNote: new FormControl('', [Validators.required, Validators.minLength(4)]),
      creditAmount: new FormControl('', [Validators.required, Validators.min(1)]),
    });

    this.transactionForm = this.formBuilder.group({
      phone: ['', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern('^[0-9]*$'),
      ]],
    });

    this.creditForm.get('transactionDate')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((date: Date | null) => {
        this.commonDate = date;
      });

    this.transactionType = this.creditForm.get('transactionType')?.value;

    if (this.clientLoggedInRole !== 'Client') {
      this.fetchUsers();
    } else {
      this.users = []; // Set accounts to an empty array if the user is a client
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async fetchUsers(): Promise<void> {
    try {
      const response = await this.userAuthService.getUsers();
      console.log(response, "users");
      this.users = response;      
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  


  async populateForm(transactionId: string): Promise<void> {
    try {
      if (transactionId) {
        this.transactionService.getTransactionById(transactionId).then(
          (transactionData: any) => {
            if (transactionData) {
              const formattedData = {
                creditName: transactionData.userId._id,
                creditAmount: transactionData.transactionAmount,
                creditNote: transactionData.note,
                transactionDate: this.datePipe.transform(transactionData.transactionDate, 'yyyy-MM-dd'),
                transactionType: transactionData.transactionType
              };
              this.creditForm.patchValue(formattedData);
            } else {
              console.error('User data not found.');
            }
          },
        );
      } else {
        console.error('User ID is not available.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }
  
  async submitCreditForm() {
    this.markFormGroupTouched(this.creditForm);
  
    if (this.creditForm.valid) {
      const currentDate = new Date(); // Get the current date
      const formattedDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd'); // Format the current date
      const receiverTransactionId = this.creditForm.get('creditName')?.value;
  
      // Prepare the form data with static 'credit' transactionType and current date
      const creditFormData = {
        transactionType: 'Debit', // Static transaction type
        transactionDate: formattedDate, // Current date
        receiverTransactionId: receiverTransactionId,
        note: this.creditForm.get('creditNote')?.value,
        transactionAmount: this.creditForm.get('creditAmount')?.value,
      };
  
      try {
        if (this.transactionId) {
          const response = await this.transactionService.updateTransaction(this.transactionId, creditFormData);
          console.log('Transaction updated successfully:', response);
          this.router.navigate(['portal/transaction']);
          this.toastr.success('Transaction Saved Successfull.', 'Success',{
            positionClass: 'toast-top-right',
         });
        } else {
          const response = await this.transactionService.createTransaction(creditFormData);
          console.log('Transaction created successfully:', response);
          this.toastr.success('Transaction Created Successfull.', 'Success',{
            positionClass: 'toast-top-right',
         });
          this.router.navigate(['../transactions']);
        }
        this.resetCreditForm();
      } catch (error) {
        console.error('Error processing transaction:', error);
      }
    }
  }  
  
  

  submitTransactionForm() {
    if (this.transactionForm.valid) {
      console.log('Form Submitted:', this.transactionForm.value);

      const phone = {
        phone: this.transactionForm.get('phone')?.value
      };

      this.transactionService.getAllTransactionsByPhone(phone).then(
        response => {
          console.log('Transaction fetched successfully:', response);
          this.toastr.success('Account Fatched Successfull.', 'Success',{
            positionClass: 'toast-top-right',
         });
          this.TransAccounts = response;
          this.transactionForm.reset()
          console.log('Transaction fetched:', this.TransAccounts);

          if (this.TransAccounts && this.TransAccounts.account) {
            this.accountName = this.TransAccounts.account.name ?? ''; 
            console.log(this.accountName, "name");
            this.closeTransactionModal();
        } else {
            this.accountName = ''; 
            console.log('No account found');
        }

          // Optionally reset the form
          // this.transactionForm.reset();
        },
        error => {
          console.error('Error fetching transaction:', error);
        }
      );
    }
  }

  resetCreditForm() {
    this.creditForm.reset();
    this.transactionType = '';
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getcreditName() {
    return this.creditForm.get('creditName');
  }

  getcreditNote() {
    return this.creditForm.get('creditNote');
  }

  getcreditAmount() {
    return this.creditForm.get('creditAmount');
  }

  creditDateError() {
    return this.creditForm.get('transactionDate')?.hasError('required') ? 'Date is Required' : '';
  }

  creditNameError() {
    return this.creditForm.get('creditName')?.hasError('required') ? 'Account Name is Required' :
      this.creditForm.get('creditName')?.hasError('minlength') ? 'Account Name cannot be less than 4 characters' : '';
  }

  creditNoteError() {
    return this.creditForm.get('creditNote')?.hasError('required') ? 'Note is Required' :
      this.creditForm.get('creditNote')?.hasError('minlength') ? 'Note cannot be less than 4 characters' : '';
  }

  creditAmountError() {
    return this.creditForm.get('creditAmount')?.hasError('required') ? 'Amount is Required' :
      this.creditForm.get('creditAmount')?.hasError('min') ? 'Amount must be greater than 0' : '';
  }

  openTransactionModal(): void {
    this.showTransactionModal = true; // Show the modal
  }

  closeTransactionModal(): void {
    this.showTransactionModal = false; // Hide the modal
  }


}