import { Component, inject, OnInit } from '@angular/core';
import { SharedEmptySectionComponent } from 'src/app/@shared/components/shared-empty-section/shared-empty-section.component';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedSearchComponent } from 'src/app/@shared/components/shared-search/shared-search.component';
import { Router, RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { ApiService } from 'src/app/@core/api/api.service';
import { API_Config } from 'src/app/@core/api/api-config/api.config';
import { UnsubscribeService } from 'src/app/@shared/services/unsubscribe/unsubscribe.service';
import { PAGESIZE } from 'src/app/@core/utilities/defines';
import { ApiRes } from 'src/app/@core/models/apiRes-model';
import { ToggleFormService } from 'src/app/@shared/modules/formly-config/services/toggle-form.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    SharedEmptySectionComponent,
    SharedButtonComponent,
    TranslateModule,
    SharedSearchComponent,
    RouterModule,
    PaginatorModule,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit   {
  _router = inject(Router);
  _apiService = inject(ApiService); 
  _toggleFormService = inject(ToggleFormService);
  _unsubscribeService = inject(UnsubscribeService); 
  data: any[] = [];
  totalCount:number=0;
  filterOptions: any = {
    pageNum: 1,
    pagSize: PAGESIZE,
    orderByDirection: 'ASC',
  };
  url:string='';
  ngOnInit(): void {
    this.url=this._router.url.includes('inactive')?'/clients/inactive/view':'/clients/view';
    this.getClientsData()
   
  }
  getClientsData(){
    this._apiService.get(API_Config.client.get,this.filterOptions).pipe(
      this._unsubscribeService.takeUntilDestroy()
    ).subscribe((res:ApiRes)=>{
      console.log(res)
      this.data=res.result.dataList||[]; 
      this.totalCount=res.result.totalCount;
      console.log(this.data)
      if (!this._router.url.includes('add')) {
        this.redirectToFirstClientInList()
      }
    })
  }


  searchValueChange(value: string): void {
    console.log(value)
  }
  onPageChange(event: any): void {
    console.log(event)
    this.filterOptions.pagSize = Number(event.rows);
    this.filterOptions.pageNum = event.first / event.rows + 1;
    this.filterOptions={...this.filterOptions}
    this.getClientsData();
    console.log(event)
  }
  redirectToFirstClientInList(){
    // this._toggleFormService.updateToggleEdit(true)
    this._router.navigate([this.url, this.data[0]?.id])
  }
}
