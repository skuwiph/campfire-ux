import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-cf-table',
  templateUrl: './cf-table.component.html',
  styleUrls: ['./cf-table.component.scss'],
})
export class CfTableComponent implements OnChanges {
    @Input() data!: CfTableData;
    @Input() sortable = false;
    @Input() showHeaders = true;
    @Output() onSelect: EventEmitter<CfTableSelectedRow> = new EventEmitter<CfTableSelectedRow>();

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        if(changes["data"]) {
            this.loadPageData();
        }
    }

    loadPageData(): void {
        this.displayFilteredAndSortedData();
    }

    onClick(colIndex: number): void {
        if(!this.sortable) return;
        // console.log(`Try sorting on ${this.data.columns[colIndex].type}`);

        if(this.sortColumn === colIndex) {
            if(this.sortDirection === 'asc') {
                this.sortDirection = 'des';
            } else {
                this.sortDirection = 'asc';
            }
        } else {
            this.sortColumn = colIndex;
            this.sortDirection = 'asc';
        }

        this.displayFilteredAndSortedData();
    }

    displayFilteredAndSortedData(): void {
        // Take the 'raw' data and populate the 'displayRows'
        // If we are paginated, sorted, or filtered, the 
        // displayRows will be markedly different
        let rows: CfTableRow[] = [];

        // filtering first, because it should be the easiest

        // next, are we sorting?
        if(this.sortable && this.sortColumn > -1) {
            rows = this.sortData();
        } else {
            rows = this.data.rows;
        }

        // finally, are we paginating?
        if (this.data.pages) {
            const p = this.data.pages;

            const startIndex = p.currentPage * p.pageSize;
            const endIndex = startIndex + p.pageSize;

            //console.log(`Page: ${p.currentPage} = Start ${startIndex}, End ${endIndex}`);

            this.displayRows = rows.slice(startIndex, endIndex);//this.data.rows.slice(startIndex, endIndex);

            this.updateButtons(this.data.pages);
        } else {
            // Display all; no pagination
            this.displayRows = rows; //this.data.rows;
        }        

    }

    sortData(): CfTableRow[] {
        const sorted = this.data.rows.sort((a, b) => {
            const type = this.data.columns[this.sortColumn].type;
            const ac = this.sortDirection === 'asc' ? a.cols[this.sortColumn] : b.cols[this.sortColumn];
            const bc = this.sortDirection === 'asc' ? b.cols[this.sortColumn] : a.cols[this.sortColumn];
            switch(type) {
                case CfTableColumnType.String:
                    return ac.localeCompare(bc, 'en');
                case CfTableColumnType.Number:
                case CfTableColumnType.Boolean:
                    console.log(`Sort on Number/Bool`);
                    return parseInt(ac) - parseInt(bc);
            }
            return 0;
        });
        return sorted.slice();
    }

    selectRow(rowIndex: number): void {
        console.log(`Selected row: ${rowIndex}: ${JSON.stringify(this.displayRows[rowIndex])}`);
        this.onSelect.emit({ pk: this.displayRows[rowIndex].pk, index: rowIndex});
    }

    setFirstPage(): void {
        if(this.data.pages) {
            this.data.pages!.currentPage = 0;
            this.loadPageData();        
        }
    }

    nextPage(): void {
        if (this.data.pages) {
            this.data.pages!.currentPage += 1;
            if(this.data.pages!.currentPage == this.data.pages!.pageCount) {
                this.data.pages!.currentPage = this.data.pages!.pageCount;
            }
            this.loadPageData();    
        }
    }
    
    previousPage() : void {
        if (this.data.pages) {
            this.data.pages!.currentPage -= 1;
            if(this.data.pages!.currentPage < 0) {
                this.data.pages!.currentPage = 0;
            }
            this.loadPageData();        
        }
    }

    setLastPage(): void {
        if (this.data.pages) {
            const pageSize = this.data.pages.pageSize > 0 ? this.data.pages.pageSize : 1; // Safety
            const maxPages = Math.ceil(this.data.rows.length / pageSize) - 1;
            this.data.pages!.currentPage = maxPages;
            this.loadPageData();
        }
    }

    updateButtons(pages: CfTablePaginationOptions): void {
        const pageSize = pages.pageSize > 0 ? pages.pageSize : 1; // Safety
        const maxPages = Math.ceil(this.data.rows.length / pageSize) -1;

        // console.log(`Current: ${pages.currentPage}, maxPages: ${maxPages}`);

        this.df = !(pages.currentPage >= 1);
        this.dp = !(pages.currentPage >= 1);
        this.dn = !(pages.currentPage < maxPages);
        this.dl = !(pages.currentPage < maxPages);

        // console.log(`Disabled: F/P/N/L: ${this.df}/${this.dp}/${this.dn}/${this.dl}`);
    }

    displayRows: CfTableRow[] = [];

    df = false;
    dp = false;
    dn = false;
    dl = false;

    sortColumn = -1;
    sortDirection = 'asc';
}

export interface CfTableSelectedRow {
    index: number;
    pk: string;
}

export enum CfTableColumnAlignment {
    Left = "lal",
    Center = "cal",
    Right = "ral"
}

export enum CfTableColumnType {
    Any = "*",
    String = "*",
    Number = "*",
    Boolean = "*",
    Date = "*",
    UserProfile = "profile",
    UserStatus = "status",
}

export interface ICfTableColumnDefinition {
    title?: string;
    align: CfTableColumnAlignment;
    type: CfTableColumnType;
    class?: string;
    getClass(): any;
}

export interface ICfTableRow {
    pk: string;
    cols: string[];
}

export interface ICfTablePaginationOptions {
    pageSize: number;
    currentPage: number;
    pageCount: number;
}

export class CfTableData {
    columns: ICfTableColumnDefinition[];
    rows: ICfTableRow[];
    pages?: ICfTablePaginationOptions;

    constructor(c: ICfTableColumnDefinition[], r: ICfTableRow[], paginationOptions?: ICfTablePaginationOptions) {
        this.columns = c;
        this.rows = r;
        this.pages = paginationOptions ?? undefined
    }
}

export class CfTableColumn implements ICfTableColumnDefinition {
    title?: string;
    align: CfTableColumnAlignment = CfTableColumnAlignment.Left;
    type: CfTableColumnType = CfTableColumnType.Any;
    class?: string;

    constructor(title?: string, alignment = CfTableColumnAlignment.Left, type = CfTableColumnType.Any, cssClass?: string) {
        this.title = title ?? '';
        this.align = alignment;
        this.type = type;
        this.class = cssClass;
    }

    getClass(): any {
        return `${this.align} ${this.class}`
    }
}

export class CfTableRow implements ICfTableRow {
    pk: string;
    cols: string[] = [];
    constructor(pk:string, columns: string[]) {
        this.pk = pk;
        this.cols = columns;
    }
}

export class CfTablePaginationOptions {
    pageSize: number;
    currentPage: number;
    pageCount: number;

    constructor( size: number, rowCount: number ) {
        this.pageSize = size;
        this.currentPage = 0;
        if(size > 0) {
            this.pageCount = Math.ceil( rowCount / size );
        } else {
            this.pageCount = 0;
        }
    }
}
