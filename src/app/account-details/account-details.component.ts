import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserAuthService } from '../Services/user-services';
import { TransactionService } from '../Services/transaction-service copy';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  accountId: string | null = null;
  accountDetails: any = {};
  totalBalance: number = 0;
  totalDebit: number = 0;
  totalCredit: number = 0;
  transactions: any[] = [];
  debitTransactions: any[] = [];
  creditTransactions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserAuthService,
    private transService: TransactionService
  ) {}

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.accountId = params['id'];
      console.log('Account ID from route:', this.accountId);
      if (this.accountId) {
        this.fetchAccountDetails();
        this.fetchTransactions();
      }
    });
  }

  resetAccountDetails() {
    this.accountDetails = {};
    this.totalBalance = 0;
    this.totalDebit = 0;
    this.totalCredit = 0;
    this.transactions = [];
    this.debitTransactions = [];
    this.creditTransactions = [];
  }

  fetchAccountDetails() {
    if (this.accountId) {
      this.userService.getUserById(this.accountId).subscribe(
        (response: any) => {
          console.log('Fetched Account Details:', response);
          this.accountDetails = response;
        }
      );
    }
  }
  async fetchTransactions(filter: any = {}) {
    try {
      if (this.accountId) {
        filter.accountId = this.accountId;  // Include the accountId in the filter
      }
      
      const response: any = await this.transService.getTransactions(filter);
      console.log('Fetched Transactions:', response);
  
         // Separate Debit and Credit transactions
    
  
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
    }
  }
  

    calculateTotal(type: 'Debit' | 'Credit'): number {
    return this.transactions
      .filter(tx => tx.transactionType === type)
      .reduce((sum, tx) => sum + tx.transactionAmount, 0);
  }
}
