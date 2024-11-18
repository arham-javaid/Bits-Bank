import { Component } from '@angular/core';
import { UserAuthService } from '../Services/user-services';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeleteConfirmationComponent } from "../Shared/delete-confirmation/delete-confirmation.component";
import { PaginationComponent } from "../Shared/pagination/pagination.component";
import { response } from 'express';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule, DeleteConfirmationComponent, ReactiveFormsModule, PaginationComponent],
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
})

export class AccountListComponent {
  filterName: string = '';
  filterPhone: string = '';
  filterAddress: string = '';
  accounts: any[] = [];
  filteredAccounts: any[] = [];
  user: any[] = [];
  searchTerm: string = '';
  p: number = 1;
  itemsPerPage: number = 10;
  itemToDeleteId: string = '';
  accId: any;
  filterForm: FormGroup;
  recordPerPage: number = 10;
  totalRecord: number = 0;
  currentPage: number = 1;
  filterCount = 0;

  constructor(
    private router: Router,
    private userAuthService: UserAuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      name: [''],
      address: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.accId = params.get('_id');
    });

    this.route.queryParams.subscribe((query: any) => {
      this.fetchAccounts(query)
      this.filterForm.patchValue(query)
    });
    // this.filterForm.valueChanges.subscribe(() => {
    //   this.updateFilterCount();
    // });
    // this.updateFilterCount();

  }
  updateFilterCount(): void {
    const filters = this.filterForm.value;
    this.filterCount = Object.keys(filters).filter(key => filters[key] && filters[key] !== 'All' && filters[key] !== 'all').length;
  }

  redirectToUserForm() {
    this.router.navigate(['/user-form']);
  }

  editAccount(accId: string) {
    this.router.navigate(['/user-form', accId]);
  }

  accountDetail(accId: string) {
    this.router.navigate(['/Accountlist', accId]);
  }

  async fetchAccounts(filter:any = {}): Promise<void> {
    this.currentPage = Number(filter.o) ? Math.floor((Number(filter.o) + 10) / this.recordPerPage) : 1;
    try {
      const response = await this.userAuthService.getUsers(filter);
      this.accounts = response;
      this.totalRecord = response.totalRecords; // Initialize filteredAccounts with all accounts
      console.log(this.accounts, "this.accounts");
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  }

  // applyFilter() {
  //   console.log('Applying filter with values:', {
  //     filterName: this.filterName,
  //     filterPhone: this.filterPhone,
  //     filterAddress: this.filterAddress,
  //   });
  
  //   this.filteredAccounts = this.accounts.filter(account => {
  //     return (
  //       (!this.filterName || (account.name && account.name.toLowerCase().includes(this.filterName.toLowerCase()))) &&
  //       (!this.filterPhone || (account.phone && account.phone.toString().toLowerCase().includes(this.filterPhone.toLowerCase()))) &&
  //       (!this.filterAddress || (account.address && account.address.toLowerCase().includes(this.filterAddress.toLowerCase())))
  //     );
  //   });
  
  //   console.log('Filtered accounts:', this.filteredAccounts);
  // }
  onSubmit(pagination = { l: this.recordPerPage, o: 0 }) {
    const formValues = this.filterForm.value;
    const filter: any = {}
    console.log(this.filterForm);
    
    if (formValues.name) {
      filter["name"] = formValues.name
    }
    if (formValues.address) {
      filter["address"] = formValues.address
    }
    filter["l"] = pagination.l
    filter["o"] = pagination.o

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filter,
      queryParamsHandling: 'merge',
    })
  }

  onReset(): void {
    this.filterForm.reset();
    this.router.navigate([], {
      queryParams: {}
    });
  }


  openDeleteModal(itemId: string) {
    this.itemToDeleteId = itemId;
    console.log(this.itemToDeleteId, "<<<<");
  }

  deleteItem(result: boolean): void {
    if (!result) {
      return;
    }

    this.userAuthService.deleteRecord(this.itemToDeleteId)
      .then((response: any) => {
        console.log(this.itemToDeleteId, "<<<<<");
        this.accounts = this.accounts.filter(account => account._id !== this.itemToDeleteId);
        // this.applyFilter(); // Reapply filter after deleting an item
        window.location.reload();
      })
      .catch((error: any) => {
        console.error('Error Deleting AccessKey:', error);
      });
  }
  pageChanged(pagination: { l: number, o: number }) {
    this.onSubmit(pagination)
  }
}
