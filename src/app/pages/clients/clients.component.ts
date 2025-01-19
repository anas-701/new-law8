import { Component, inject, OnInit } from '@angular/core';
import { SharedEmptySectionComponent } from 'src/app/@shared/components/shared-empty-section/shared-empty-section.component';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedSearchComponent } from 'src/app/@shared/components/shared-search/shared-search.component';
import { Router, RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { clients } from './client.fake';
import { ApiService } from 'src/app/@core/api/api.service';
import { API_Config } from 'src/app/@core/api/api-config/api.config';
import { UnsubscribeService } from 'src/app/@shared/services/unsubscribe/unsubscribe.service';
import { PAGESIZE } from 'src/app/@core/utilities/defines';

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
  _unsubscribeService = inject(UnsubscribeService); 
  data: any[] = [];
  url:string='';
  filterOptions: any = {
    pageNum: 1,
    pagSize: PAGESIZE,
    orderByDirection: 'ASC',
  }
  ngOnInit(): void {
    this.url=this._router.url.includes('inactive')?'/clients/inactive/view':'/clients/view';
    this.getClientsData();
  }
  getClientsData(){
    this._apiService.get(API_Config.client.get).pipe(
      this._unsubscribeService.takeUntilDestroy()
    ).subscribe((res:any)=>{
      this.data=res.data;
      if (!this._router.url.includes('add')) {
        this.redirectToFirstClientInList()
      }
    })
  }


  searchValueChange(value: string): void {
    this.filterOptions={...this.filterOptions,search:value};
    this.getClientsData();
  }
  onPageChange(event: any): void {
    this.filterOptions.pagSize = Number(event.rows);
    this.filterOptions.pageNum = event.first / event.rows + 1;
    this.getClientsData();
    console.log(event)
  }
  redirectToFirstClientInList(){
    this._router.navigate([this.url, this.data[0].id])
  }
}
