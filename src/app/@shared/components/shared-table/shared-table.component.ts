import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, inject, Input, Output, TemplateRef } from '@angular/core';
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
export class SharedTableComponent {

  _languageService = inject(LanguageService)
  @Input() withPagination: boolean = true
  @Input() data: any
  @Input() columns: any[] = [];
  @Output() onPageChange = new EventEmitter()
  @ContentChild('columnActions', { static: false })
  columnActionsTemplateRef?: TemplateRef<any>;

  @ContentChild('customColumn', { static: false })
  customColumnTemplateRef?: TemplateRef<any>;

  pagination: any={ pageSize: PAGESIZE, page: 1, totalElements: 0 };
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
