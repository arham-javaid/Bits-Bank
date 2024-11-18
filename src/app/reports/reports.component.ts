import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeleteConfirmationComponent } from '../Shared/delete-confirmation/delete-confirmation.component';
import { PaginationComponent } from "../Shared/pagination/pagination.component";
import { UserAuthService } from '../Services/user-services';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TransactionService } from '../Services/transaction-service copy';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule, DeleteConfirmationComponent, DatePipe, ReactiveFormsModule, PaginationComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  transactions: any[] = [];
  accounts: any[] = [];
  filterForm!: FormGroup;
  debitData: { date: string, amount: number }[] = [];
  creditData: { date: string, amount: number }[] = [];


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
    this.fetchAccounts();
    this.fetchDateWiseTransactions()
  }
  async fetchDateWiseTransactions(): Promise<void> {
    try {
      const response = await this.transactionService.getDateWiseTransactions();
      this.transactions = response; 
      console.log(this.transactions,"<<<<<<<transactions");  
    } catch (error) {
      console.error('Error fetching date-wise transactions:', error);
    }
  }
  async fetchAccounts(): Promise<void> {
    try {
      const response = await this.userAuthService.getUsers();
      console.log(response);
      
      this.accounts = response.data;      
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  }
  onSubmit() {
    const formValues = this.filterForm.value;
    const filter: any = {}
  }

  generatePDF() {
    if (!this.transactions || this.transactions.length === 0) {
      alert('No data found');
      return;
    }
  
    const doc = new jsPDF();

    doc.text('Transaction Report', 14, 16);
    const tableData = this.transactions.map(transaction => [
      transaction.date,
      transaction.totals.Credit || 'N/A',
      transaction.totals.Debit || 'N/A'
    ]);
    const columns = ['Date', 'Credit', 'Debit'];
    autoTable(doc, {
      head: [columns],
      body: tableData,
      startY: 20
    });
    doc.save('Transaction_Report.pdf');
  }
  onReset() {
    this.filterForm.reset();
    this.router.navigate([], {
      queryParams: {},
    });
  }
  redirectToUserForm() {
    this.router.navigate(['/log-book']);
  }
}