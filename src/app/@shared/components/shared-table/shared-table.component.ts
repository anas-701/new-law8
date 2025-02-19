import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SharedModule } from '../../shared.module';
import { PaginatorModule } from 'primeng/paginator';
import { LanguageService } from 'src/app/@core/services';
import { PAGE_SIZE_OPTION, PAGESIZE } from 'src/app/@core/utilities/defines';

@Component({
  selector: 'app-shared-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    SharedModule,
    PaginatorModule
  ],
  templateUrl: './shared-table.component.html',
  styleUrl: './shared-table.component.scss'
})
export class SharedTableComponent implements OnChanges{


  _languageService = inject(LanguageService)
  @Input() withPagination: boolean = true
  @Input() data: any
  @Input() columns: any[] = [];
  @Input() pagination: any={ pagSize: PAGESIZE, pageNum: 1, totalElements: 0,orderByDirection: 'ASC', };
  @Output() onPageChange = new EventEmitter()
  @ContentChild('columnActions', { static: false })
  columnActionsTemplateRef?: TemplateRef<any>;

  @ContentChild('customColumn', { static: false })
  customColumnTemplateRef?: TemplateRef<any>;
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pagination'].currentValue) this.getTableMessages()
  }
  getTableMessages(): void {
    
    this.currentPageReportTemplate = `${this._languageService.getTransValue('messages.dataMessage')} ${this.pagination.totalElements ? this.pagination.totalElements : 0}`;
  }
  
  first: number = 0;
  currentPageReportTemplate: string = this._languageService.getTransValue('messages.dataMessage');
  PAGE_SIZE_OPTION = PAGE_SIZE_OPTION;
  pageChanged(e?: any) {
    if (e) {
      this.pagination.pageSize = Number(e.rows);
      this.pagination.page = e?.page + 1;
      this.first = e.first;
      this.onPageChange.emit(e);
    }
  }
}
