import { Component, OnChanges ,Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnChanges {
    @Input() currentPage: number = 1;
    @Input() totalRecords: number = 0;
    @Input() recordsPerPage: number = 10;
    @Output() pageChange = new EventEmitter<{ l: number, o: number }>();
    public totalPages = 0;
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['totalRecords']) {
        this.calculateTotalPages();
      }
    }
  
    get pages(): number[] {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
  
    goToPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.pageChange.emit({
          l: this.recordsPerPage,
          o: (this.currentPage - 1) * this.recordsPerPage,
        });
      }
    }
  
    calculateTotalPages() {
      if (this.totalRecords <= 0) {
        this.totalPages = 1;
      } else {
        this.totalPages = Math.ceil(this.totalRecords / this.recordsPerPage);
      }
    }
}