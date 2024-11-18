import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeleteConfirmationComponent } from '../Shared/delete-confirmation/delete-confirmation.component';
import { PaginationComponent } from "../Shared/pagination/pagination.component";
import { UserAuthService } from '../Services/user-auth.service';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TransactionService } from '../Services/transaction-service copy';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule,
     DeleteConfirmationComponent, DatePipe, ReactiveFormsModule, PaginationComponent, RouterLink ],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  users: any[] = [];
  itemToDeleteId: string = '';
  p: number = 1;
  itemsPerPage: number = 10;
  filterForm!: FormGroup;
  recordPerPage: number = 10;
  filterCount = 0;
  totalRecord: number = 0;
  currentPage: number = 1;
  isFilterVisible: boolean = false;
  isTableVisible: boolean = false;
  totalTransactionAmount: number = 0;
  currentUserName: string = '';
  currentuser: any = null;

  
  constructor(
    private router: Router,
    private transactionService: TransactionService,
    private userAuthService: UserAuthService,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
      userId: [''],
      transactionType: [''],
    });
  }

  ngOnInit() {
    // Handle route parameters
    this.route.paramMap.subscribe((params) => {
      this.itemToDeleteId = params.get('id') ?? '';
      console.log(this.itemToDeleteId, 'item id');
    });

    // Handle query parameters for filters
    this.route.queryParams.subscribe((query: any) => {
      this.fetchTransactions({ ...query });
      this.filterForm.patchValue(query);
    });

    // Listen for changes in filter form to update filter count
    this.filterForm.valueChanges.subscribe(() => {
      this.updateFilterCount();
    });

    this.fetchUsers();
    this.calculateTotalTransactions();
    this.loadCurrentUser(); // Properly load the current user

   }

  updateFilterCount(): void {
    const filters = this.filterForm.value;
    this.filterCount = Object.keys(filters).filter(
      (key) => filters[key] && filters[key] !== 'All' && filters[key] !== 'all'
    ).length;
  }

  toggleFilterVisibility(): void {
    this.isFilterVisible = !this.isFilterVisible;
  }

  toggleTableVisibility(): void {
    this.isTableVisible = !this.isTableVisible;
  }

  calculateTotalTransactions(): void {
    this.totalTransactionAmount = this.transactions.reduce(
      (sum, transaction) => sum + (transaction.transactionAmount || 0),
      0
    );
    console.log(this.totalTransactionAmount, 'amount');
  }

  // Properly load current user and handle null scenarios
  private loadCurrentUser(): void {
    this.currentuser = this.userAuthService.getLoggedUser();
    console.log(this.currentuser, 'current user');

    if (this.currentuser && this.currentuser.data && this.currentuser.data.name) {
      this.currentUserName = this.currentuser.data.name;
      console.log(this.currentUserName, 'username');
    } else {
      console.error('Unable to retrieve the current user name');
    }
  }

  // Fetch transactions using the filter
  async fetchTransactions(filter: any = {}) {
    // Set the current page based on the 'o' query param
    this.currentPage = Number(filter.o)
      ? Math.floor((Number(filter.o) + 10) / this.recordPerPage)
      : 1;
    console.log(this.currentPage);
  
    try {
      const response: any = await this.transactionService.getTransactions(filter);
      console.log('data', response);
  
      // Set the credit and debit transactions separately
      this.transactions = response.transactions;
      this.totalRecord = response.totalRecords;
      this.calculateTotalTransactions();
  
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
    }
  }
  
 
  
  downloadPDF() {
    if (this.transactions.length === 0) {
      alert('No data found');
      return;
    }
  
    const doc = new jsPDF();
    const headers = [['Date', 'User', 'Type', 'Amount']];
    const data = this.transactions.map(transaction => [
      this.datepipe.transform(transaction.transactionDate, 'MM-dd-yyyy'),
      transaction.userId?.name || '',
      transaction.transactionType,
      transaction.transactionAmount
    ]);
  
    autoTable(doc, {
      head: headers,
      body: data,
    });
    doc.save('transactions.pdf');
  }

  async fetchUsers(): Promise<void> {
    try {
      const response = await this.userAuthService.getUsers();
      console.log(response, "users");
      
      this.users = response;      
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  }     
  
  private currentUser(): void {
    const currentUser = this.userAuthService.getLoggedUser(); // Make sure you're using 'this' to call the method
    console.log(currentUser, "username");
    
    if (currentUser && currentUser.data && currentUser.data.name) {
      this.currentUserName = currentUser.data.name;
    console.log(this.currentUserName, "username");

    } else {
      console.error('Unable to retrieve the current user name');
    }
  }

  onSubmit(pagination = { l: this.recordPerPage, o: 0 }) {
    const formValues = this.filterForm.value;
    const filter: any = {}
    
    if (formValues.startDate) {
      filter["startDate"] = formValues.startDate
    }
    if (formValues.endDate) {
      filter["endDate"] = formValues.endDate
    }
    if (formValues.userId) {
      filter["userId"] = formValues.userId
    }
    if (formValues.transactionType) {
      filter["transactionType"] = formValues.transactionType
    }
    filter["l"] = pagination.l
    filter["o"] = pagination.o

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filter,
      queryParamsHandling: 'merge',
    })
  }

  onReset() {
    this.filterForm.reset();
    this.router.navigate([], {
      queryParams: {},
    });
  }

  openDeleteModal(itemId: string) {
    this.itemToDeleteId = itemId;
  }

  async deleteItem(result: boolean): Promise<void> {
    if (!result) {
      return;
    }

    try {
      await this.transactionService.deleteTransaction(this.itemToDeleteId);

      this.transactions = this.transactions.filter(transaction => transaction._id !== this.itemToDeleteId);
    } catch (error) {
      console.error('Error Deleting Transaction:', error);
    }
  }

  editTransaction(transactionId: string) {
    this.router.navigate(['/log-book', transactionId]);
  }
  pageChanged(pagination: { l: number, o: number }) {
    this.onSubmit(pagination)
  }
  
}