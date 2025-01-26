import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { SharedEmptySectionComponent } from 'src/app/@shared/components/shared-empty-section/shared-empty-section.component';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedSearchComponent } from 'src/app/@shared/components/shared-search/shared-search.component';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { ApiService } from 'src/app/@core/api/api.service';
import { API_Config } from 'src/app/@core/api/api-config/api.config';
import { UnsubscribeService } from 'src/app/@shared/services/unsubscribe/unsubscribe.service';
import { PAGESIZE } from 'src/app/@core/utilities/defines';
import { ApiRes } from 'src/app/@core/models/apiRes-model';
import { ToggleFormService } from 'src/app/@shared/modules/formly-config/services/toggle-form.service';
import { AsyncPipe } from '@angular/common';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    SharedEmptySectionComponent,
    SharedButtonComponent,
    TranslateModule,
    SharedSearchComponent,
    RouterModule,
    PaginatorModule
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit,OnDestroy {
  _router = inject(Router);
  _route = inject(ActivatedRoute);
  _apiService = inject(ApiService);
  _toggleFormService = inject(ToggleFormService);
  _clientService = inject(ClientService)
  _unsubscribeService = inject(UnsubscribeService);
  data: any[] = [];
  totalCount: number = 0;
  filterOptions: any = {
    pageNum: 1,
    pagSize: PAGESIZE,
    orderByDirection: 'ASC',
  };
  url: string = '';
  refreshData = effect(() => {
    console.log(this._clientService.getRefreshData())
    if (this._clientService.getRefreshData()) {
      this.getData()
    }
  })
  ngOnInit(): void {
    this.url = this._router.url.includes('inactive') ? '/inactive/clients/view' : '/clients/view';
    this.getQueryParams()
    this._clientService.refreshData$.pipe(
      this._unsubscribeService.takeUntilDestroy()
    ).subscribe({
      next:(res)=>{
        if(res) this.getData()
      }
    })

  }

  getData() {
    this.filterOptions = {
      ...this.filterOptions,
      isActive: this._router.url.includes('inactive') ? false : true
    }
    console.log('getData')
    this._apiService.get(API_Config.client.get, this.filterOptions).pipe(
      this._unsubscribeService.takeUntilDestroy()
    ).subscribe((res: ApiRes) => {
      this.data = res.result.dataList || [];
      this.totalCount = res.result.totalCount;
      if (!this._router.url.includes('add')) {
        this.redirectToFirstClientInList()
      }
    })
    
  }
  getQueryParams(){
    this._route.paramMap.pipe(this._unsubscribeService.takeUntilDestroy()).subscribe((params:any) => {
      // const currentUrl = urlSegments.map((segment:any) => segment.path).join('/');
      console.log(params)
      this.getData()
    })
  }


  searchValueChange(value: string): void {
    this.filterOptions.search = value;
    this.filterOptions = { ...this.filterOptions }
    this.getData();
  }
  onPageChange(event: any): void {
    this.filterOptions.pagSize = Number(event.rows);
    this.filterOptions.pageNum = event.first / event.rows + 1;
    this.filterOptions = { ...this.filterOptions }
    this.getData();
  }
  redirectToFirstClientInList() {
    // this._toggleFormService.updateToggleEdit(true)
    this._router.navigate([this.url, this.data[0]?.id])
  }
  ngOnDestroy(): void {
    this._unsubscribeService.destroy();
  }
}
