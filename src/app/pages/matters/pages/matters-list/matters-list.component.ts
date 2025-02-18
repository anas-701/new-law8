import { Component, OnInit } from '@angular/core';
import { Matter_Columns } from './matters-columns.config';
import { SharedTableComponent } from 'src/app/@shared/components/shared-table/shared-table.component';
import { matters } from './matter.fake';
import { SharedStatusComponent } from 'src/app/@shared/components/shared-status/shared-status.component';
import { matter_statusConfig } from './matter-status.config';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from 'src/app/@shared/shared.module';
import { MatterFilterComponent } from '../../components/matter-filter/matter-filter.component';
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
  ngOnInit(): void {
    console.log('text')
  }
  data: any=[]=matters
  columns: any=[]=Matter_Columns;
  statusConfig=matter_statusConfig
  onFilter(e:any){
    console.log('onFilter',e)
  }

}
