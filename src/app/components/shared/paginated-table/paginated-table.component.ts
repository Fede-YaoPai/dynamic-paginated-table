import { Component, Input, OnInit } from '@angular/core';

interface displayedPropsValidity {
  valid: boolean,
  errors: string[]
}

@Component({
  selector: 'app-paginated-table',
  templateUrl: './paginated-table.component.html',
  styleUrls: ['./paginated-table.component.scss']
})
export class PaginatedTableComponent implements OnInit {

  @Input() dataSource!: any[];
  @Input() displayedColumns!: string[];
  @Input() displayedProps!: string[];
  @Input() tableClasses!: string[];
  @Input() rowsPerPage!: number;
  @Input() showIndex: boolean = false;

  @Input() maxDisplayedPaginatorItems: number = 10;
  @Input() paginatorClasses!: string[];
  @Input() paginatorItemClasses!: string[];
  @Input() paginatorLinkClasses!: string[];
  @Input() firstPageInnerHTML!: string;
  @Input() previousPageInnerHTML!: string;
  @Input() nextPageInnerHTML!: string;
  @Input() lastPageInnerHTML!: string;

  public currentPage: number = 1;
  public totalPages: number = 0;
  public maxPagesExceeded: boolean = false;
  public paginatorSlideFactor: number = 1;

  public readonly paginatorClass: string = 'paginator-fyp';
  public readonly paginatorItemClass: string = 'paginator-item-fyp';
  public readonly paginatorLinkClass: string = 'paginator-link-fyp';

  constructor() { }

  ngOnInit(): void {
  }

  public renderTable(dataSource: any[]): any[] {
    let displayedPropsValidity: displayedPropsValidity =
      this.areDisplayedPropsValid(dataSource, this.displayedProps);

    if (!displayedPropsValidity.valid) {
      throw new Error(
        `PaginatedTableError: displayedProps items [${displayedPropsValidity.errors}] do not match the table's dataSource object structure!`
      );
    }

    let filteredDataSource: any[] = [];

    if (dataSource) {
      filteredDataSource = dataSource
        .slice(this.getSliceStart(), this.getSliceEnd())
      ;

      this.totalPages = this.getTotalPages(dataSource);
    }

    return filteredDataSource;
  }

  private areDisplayedPropsValid(dataSource: any[], displayedProps: string[]): displayedPropsValidity{
    let valid: boolean = true;
    let error: string[] = [];

    let dataSourceObjectProps: string[] = [];

    for (let prop in dataSource[0]) {
      dataSourceObjectProps.push(prop);
    }

    for (let prop of displayedProps) {
      if (!dataSourceObjectProps.includes(prop)) {
        valid = false;
        error.push(prop);
      }
    }

    return {valid: valid, errors: error};
  }

  private getTotalPages(array: any[]): number {
    let totalPages: number = Math.ceil(array.length / this.rowsPerPage);;

    if (totalPages <= this.maxDisplayedPaginatorItems) {
      this.maxPagesExceeded = false;
    }
    else {
      this.maxPagesExceeded = true;
    }

    return totalPages;
  }

  private getSliceStart(): number {
    return this.rowsPerPage * (this.currentPage - 1);
  }

  private getSliceEnd(): number {
    return this.getSliceStart() + this.rowsPerPage;
  }

  public firstPage(): void {
    if (!this.isFirstPage()) this.currentPage = 1;

    if (this.paginatorSlideFactor > 1) {
      this.paginatorSlideFactor = 1;
    }
  }

  public previousPage(): void {
    if (!this.isFirstPage()) this.currentPage--;

    if (this.paginatorSlideFactor > 1) {
      if (this.currentPage != this.totalPages - 1)
        this.paginatorSlideFactor--;
    }
  }

  public nextPage(): void {
    if (!this.isLastPage()) this.currentPage++;

    if (this.maxPagesExceeded) {
      if (this.currentPage > this.getPagesArray().length && this.paginatorSlideFactor < this.totalPages - this.getPagesArray().length) {
        this.paginatorSlideFactor++;
      }
    }
  }

  public lastPage(): void {
    if (!this.isLastPage()) this.currentPage = this.totalPages;

    if (this.maxPagesExceeded) {
      this.paginatorSlideFactor = this.totalPages - this.getPagesArray().length;
    }
  }

  public thisPage(page: number): void {
    this.currentPage = page;
  }

  private isFirstPage(): boolean {
    return this.currentPage == 1;
  }

  private isLastPage(): boolean {
    return this.currentPage == this.totalPages;
  }

  public getCustomPageStyle(i: number): string[] {
    let classes: string[] = [];

    if (this.paginatorItemClasses)
      classes.push(...this.paginatorItemClasses)
    else
      classes.push('paginator-item-fyp')

    if (this.currentPage == i)
      classes.push('active');

    return classes;
  }

  public getShownIndex(i: number): number {
    let previousPages: number = this.currentPage - 1;
    let shownIndex: number = (previousPages * this.rowsPerPage) + i;

    return shownIndex;
  }

  public getPagesArray() {
    let arrayConstructor: number = this.maxPagesExceeded ? this.maxDisplayedPaginatorItems - 2 : this.totalPages;

    return [].constructor(arrayConstructor);
  }

}
