import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { matter } from '../../matter.fake';
import { SharedStatusComponent } from 'src/app/@shared/components/shared-status/shared-status.component';
import { matter_statusConfig } from '../../../matters-list/matter-status.config';
import { DatePipe } from '@angular/common';
import { PracticeAreaLabel } from 'src/app/pages/matters/enums/matter-practicearea';
import { ChipModule } from 'primeng/chip';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { TableModule } from 'primeng/table';
import { DialogService } from 'primeng/dynamicdialog';
import { MatterAddressEditorComponent } from './components/matter-address-editor/matter-address-editor.component';
@Component({
  selector: 'app-matter-detail-info',
  standalone: true,
  imports: [
    TranslateModule,
    SharedStatusComponent,
    DatePipe,
    ChipModule,
    SharedButtonComponent,
    TableModule
  ],
  templateUrl: './matter-detail-info.component.html',
  styleUrl: './matter-detail-info.component.scss'
})
export class MatterDetailInfoComponent {
  _dialogService=inject(DialogService)
  data:any=matter;
  statusConfig= matter_statusConfig;
  practiceAreaLabel:any=PracticeAreaLabel;
  openAddressEditor(rowData?:any){
    this._dialogService.open(MatterAddressEditorComponent,{
      header:rowData?'Update Address':'Add Address',
      data:{rowData}
    })
  }
}
