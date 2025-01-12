import { inject, InjectionToken } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '@core/services';
import { FilterService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { UnsubscribeService } from '@shared/services/unsubscribe/unsubscribe.service';
import { PAGESIZE } from '../utilities/defines';


export const CUSTOM_UNSUBSCRIBE_TOKEN = new InjectionToken<UnsubscribeService>('CustomUnsubscribeService', {
  providedIn: 'root',
  factory: () => new UnsubscribeService()
});

export abstract class TableBaseClass  {


  isLoading: boolean = false;
  tableColumns:any[] = []
  tableData:any [] = []
  tempTableData:any [] = []
  pagination: PaginationDTO= { pageSize: PAGESIZE, page: 0 , totalElements:0 };

  _languageService = inject(LanguageService);
  _dialogService = inject(DialogService);
  _dynamicDialogConfig = inject(DynamicDialogConfig);
  _dynamicDialogRef = inject(DynamicDialogRef);
  _confirmModalService = inject(ConfirmModalService);
  _successModalService = inject(SuccessModalService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _unsubscribe = inject(CUSTOM_UNSUBSCRIBE_TOKEN);

   _filterService = inject(FilterService);

  abstract getTableData(): void;

  // on filter
  onFilter(filtersValues:any):void {};

  //on page change
  onPageChange(e: any) {
    this.pagination.page = e.page;
    this.getTableData();
  }
  //on export excel
  onExportExcel():void{};

}
