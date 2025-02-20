import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { matter } from '../../matter.fake';
import { SharedStatusComponent } from 'src/app/@shared/components/shared-status/shared-status.component';
import { matter_statusConfig } from '../../../matters-list/matter-status.config';
import { DatePipe } from '@angular/common';
import { PracticeAreaLabel } from 'src/app/pages/matters/enums/matter-practicearea';
import { ChipModule } from 'primeng/chip';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { TableModule } from 'primeng/table';
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
  data:any=matter;
  statusConfig= matter_statusConfig;
  practiceAreaLabel:any=PracticeAreaLabel
}
