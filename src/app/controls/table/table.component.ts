import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'control-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {

  _search: string | any= '' ;
  _searchDate: Date | any;
  _dataSource: any;
  headerColumns:any = [];
  orderBy: string | any = '';
  @Input() public pageSizeOptions: number[] = [5, 10, 15, 25, 30 , 50, 100];
  @Input() public tableColumns: any;
  @Input() public selectable: boolean = false;
  @Input() public pageSize: number = 5;
  @Input() public dataSize: number = 0;
  @Input() public totalPages: number = 0;
  @Input() public pageIdxSelected: number = 0;
  @Input() public applySort: boolean = false;
  @Input() public loadingData: boolean = false; 
  @Output() public selected: EventEmitter<any> = new EventEmitter();
  // protected data: MatTableDataSource<any>= new MatTableDataSource([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | any;
  @ViewChild(MatSort, { static: true }) sort: MatSort | any ;
  pageEvent: PageEvent | any;
  @Output() public pageChange: EventEmitter<any> = new EventEmitter();
  @Input()
  set search(val) {
    this._search = val;
    if (val.length > 0) {
      this.applyFilter();
    } else {
      this.eraseFilter();
    }
  }
  get search() {
    return this._search;
  }

  @Input()
  set searchDate(val) {
    this._searchDate = val;
    if (val != null) {
      this.applyDateFilter();
    } else {
      this.eraseFilter();
    }
  }
  get searchDate() {
    return this._searchDate;
  }

  @Input()
  set dataSource(val) {
    this._dataSource = val;
    // this.paginator.pageSize=this.pageSize;
    if (this.dataSize == 0) {
      this._dataSource.paginator = this.paginator;
    } else {
      // if(this.previousPage!=null && this.pageSize<val.length){
      //   this.paginator.pageIndex=this.previousPage+1;
      // } else {
      //   this.paginator.pageIndex=0;
      // }
      this.paginator.pageIndex = this.pageIdxSelected;
      this.paginator.length = this.dataSize;
      this._dataSource.paginator = undefined;
    }
    this._dataSource.sort = this.sort;
  }
  get dataSource() {
    return this._dataSource;
  }

  constructor() { }

  ngOnInit(): void {
    if (this.tableColumns != null) {
      this.headerColumns = this.tableColumns.filter((f: any) => f.campo != null).map((m: any) => m.campo);
      if (this.tableColumns.some((e: any) => e.campo == null)) {
        this.headerColumns.push('Acciones');
      }
    }
    if (this.applySort == true) {
      this.orderBy = this.headerColumns[0];
    }
    // this.dataSource = new MatTableDataSource(this.dataSource);
    // this.headerColumns.push(null);
  }

  ngOnDestroy() {
    if (this.selected != null) {
      this.selected.unsubscribe();
    }
  }

  applyFilter() {
    this._dataSource.filter = this._search.trim().toLowerCase();
    if (this._dataSource.paginator) {
      this._dataSource.paginator.firstPage();
    }
  }

  applyDateFilter() {
    if (this._dataSource != undefined) {
      this._dataSource.filterPredicate = (data: any, filter: string) => {
        return data.DFECHA_OPERA == filter;
      };
      this._dataSource.filter = this._searchDate;
      if (this._dataSource.paginator) {
        this._dataSource.paginator.firstPage();
      }
    }
  }

  eraseFilter() {
    if (this._dataSource != undefined) {
      this._dataSource.filter = null;
    }
  }

  OnSelection(element: any) {
    this.selected.emit(element);
  }

  page_OnChange(ev: any) {
    this.pageEvent = ev;
    //console.log(this.pageEvent);
    this.pageChange.emit(this.pageEvent);
  }

}
