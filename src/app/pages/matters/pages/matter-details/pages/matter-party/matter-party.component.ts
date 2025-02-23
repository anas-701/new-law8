import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { mattterParties } from './matter-parties.fake';
import { SharedModule } from 'src/app/@shared/shared.module';
import { SharedStatusComponent } from 'src/app/@shared/components/shared-status/shared-status.component';
import { matter_Parties_statusConfig } from './matter-party-status.config';
import { DialogService } from 'primeng/dynamicdialog';
import { MatterPartyEditorComponent } from './components/matter-party-editor/matter-party-editor.component';

@Component({
  selector: 'app-matter-party',
  standalone: true,
  imports: [
    TableModule,
    SharedButtonComponent,
    SharedModule,
    SharedStatusComponent
  ],
  templateUrl: './matter-party.component.html',
  styleUrl: './matter-party.component.scss'
})
export class MatterPartyComponent {
  _dialogService=inject(DialogService)
  data:any=mattterParties;
  partiesStatusConfig = matter_Parties_statusConfig;
  openPartyEditor(rowData?:any){
    this._dialogService.open(MatterPartyEditorComponent,{
      header:rowData?'Update Party':'Add Party',
      data:{rowData}
    })
  }
}
