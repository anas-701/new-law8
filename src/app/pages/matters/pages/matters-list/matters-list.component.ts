import { Component, inject, OnInit } from '@angular/core';
import { Matter_Columns } from './matters-columns.config';
import { SharedTableComponent } from 'src/app/@shared/components/shared-table/shared-table.component';
import { matters } from './matter.fake';
import { SharedStatusComponent } from 'src/app/@shared/components/shared-status/shared-status.component';
import { matter_statusConfig } from './matter-status.config';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from 'src/app/@shared/shared.module';
import { MatterFilterComponent } from '../../components/matter-filter/matter-filter.component';
import { ApiService } from 'src/app/@core/api/api.service';
import { API_Config } from 'src/app/@core/api/api-config/api.config';
import { UnsubscribeService } from 'src/app/@shared/services/unsubscribe/unsubscribe.service';
import { finalize } from 'rxjs';
import { ApiRes } from 'src/app/@core/models/apiRes-model';
import { PAGESIZE } from 'src/app/@core/utilities/defines';
import { MatterDto } from '../../interfaces/matter.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-matters-list',
  standalone: true,
  imports: [
    SharedTableComponent,
    SharedStatusComponent,
    TooltipModule,
    MatterFilterComponent,
    SharedModule
  ],
  templateUrl: './matters-list.component.html',
  styleUrl: './matters-list.component.scss'
})
export class MattersListComponent implements OnInit{
 
  isLoading:boolean =true;
  private _apiService=inject(ApiService)
  private _unsubscribeService=inject(UnsubscribeService);
  private _router=inject(Router)
  data: MatterDto[]=[]
  columns: any=[]=Matter_Columns;
  statusConfig=matter_statusConfig;
  pagination: any = { pagSize: PAGESIZE, pageNum: 1, totalElements: 0 ,orderByDirection: 'ASC',};
  first!:number;
  ngOnInit(): void {
    if(this._router.url.includes('favourite')){
      this.getFavouriteMatters()
    }else{
      this.getMatterList()
    }
    
  }
  onFilter(e:any){
    
    this.pagination={
      ...this.pagination,
      clientId:e.clientId.id
    }
    console.log('this.pagination',this.pagination)
    if(this._router.url.includes('favourite')){
      this.getFavouriteMatters()
    }else{
      this.getMatterList()
    }
  }
  onPageChange(e:any){
    this.pagination.pagSize = Number(e.rows);
    this.pagination.pageNum = e.first / e.rows + 1;
    this.first = e?.first;
    this.getMatterList()
  }
  getMatterList(){
    this._apiService.get(API_Config.matters.get,this.pagination).pipe(
      finalize(()=>this.isLoading=false),
      this._unsubscribeService.takeUntilDestroy()
    ).subscribe({
      next:(res:ApiRes)=>{
        if(res&&res.isSuccess){
          this.data=res.result.dataList as MatterDto[];
          this.pagination = {
            ...this.pagination,
            totalElements:res.result['totalCount']||0
          }
        } 
      }
    })
  }
  getFavouriteMatters(){
    this._apiService.get(API_Config.importantMatterDashboard.get,this.pagination).pipe(
      finalize(()=>this.isLoading=false),
      this._unsubscribeService.takeUntilDestroy()
    ).subscribe({
      next:(res:ApiRes)=>{
        if(res&&res.isSuccess){
          this.data=res.result.dataList as MatterDto[];
          this.pagination = {
            ...this.pagination,
            totalElements:res.result['totalCount']||0
          }
        } 
      }
    })
  }
  toggleFavourite(rowData:MatterDto){
    let payload = {
      matterId: rowData.id
    };
  
    this._apiService.post(API_Config.matters.importentMatter, null, payload).pipe(
      this._unsubscribeService.takeUntilDestroy()
    ).subscribe({
      next: (res: ApiRes) => {
        if (res && res.isSuccess) {
          rowData.isImportent = !rowData.isImportent;
          if(this._router.url.includes('favourite')){
            this.getFavouriteMatters()
          }else{
            this.getMatterList()
          }
        }
      }
    });
  }

}
