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
  @Input() itemsPerPage!: number;
  @Input() showIndex: boolean = false;

  @Input() tableClasses!: string[];
  @Input() paginatorClasses!: string[];
  @Input() paginatorItemClasses!: string[];
  @Input() paginatorLinkClasses!: string[];

  public currentPage: number = 1;
  public totalPages: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  public renderTable(dataSource: any[]): any[] {
    let displayedPropsValidity: displayedPropsValidity =
      this.areDisplayedPropsValid(dataSource, this.displayedProps);

    if (!displayedPropsValidity.valid) {
      throw new Error(
        `PaginatedTableError: displayedProps items [${displayedPropsValidity.errors}] do not match the table's dataSource object structure!`
      )
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
    return Math.ceil(array.length / this.itemsPerPage)
  }

  private getSliceStart(): number {
    return this.itemsPerPage * (this.currentPage - 1);
  }

  private getSliceEnd(): number {
    return this.getSliceStart() + this.itemsPerPage;
  }

  public firstPage(): void {
    if (!this.isFirstPage()) this.currentPage = 1;
  }

  public previousPage(): void {
    if (!this.isFirstPage()) this.currentPage--;
  }

  public nextPage(): void {
    if (!this.isLastPage()) this.currentPage++;
  }

  public lastPage(): void {
    if (!this.isLastPage()) this.currentPage = this.totalPages;
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

}