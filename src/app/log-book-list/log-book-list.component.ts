import { Component, forwardRef, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TransactionService } from '../Services/transaction-service copy';
@Component({
  selector: 'c',
  standalone: true,
  imports: [CommonModule, PaginationModule, FormsModule],
  templateUrl: './log-book-list.component.html',
  styleUrl: './log-book-list.component.css'
})
export class LogBookListComponent {
  itemsPerPage = 10;
  currentPage = 1;
  debitTransactions: any[] = [];
  creditTransactions: any[] = [];
  totalDebit = 0;
  totalCredit = 0;



  constructor(private router: Router,
    private transactionService: TransactionService) { }

  // get pagedAccounts() {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   return this.accounts.slice(startIndex, startIndex + this.itemsPerPage);
  // }

  redirectToUserForm() {
    this.router.navigate(['/user-form']);
  }

  deleteAccount(accountId: number) {
// this.toastr.success('Access Key Copied to clipboard.', 'Success',{
      //   positionClass: 'toast-bottom-right',
      // });
  }

  editAccount(accountId: number) {

  }

  

  fetchTransactions() {
    this.transactionService.getTransactions().then(
      (response: any) => {
        console.log(response,"<<<<PPPPPP");
        response.forEach((transaction: any) => {
          if (transaction.transactionType === 'Debit') {
            this.debitTransactions.push(transaction);
          } else if (transaction.transactionType === 'Credit') {
            this.creditTransactions.push(transaction);
          }
        });

        console.log('Debit Transactions:', this.debitTransactions);
        console.log('Credit Transactions:', this.creditTransactions);
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }
  
}

