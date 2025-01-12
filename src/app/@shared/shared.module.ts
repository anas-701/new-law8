import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';


const components: any = [
];


const modules = [
  CommonModule,
  TranslateModule,
  RouterModule,
  DialogModule

];

@NgModule({
  declarations: [...components],
  imports: [ ...modules],
  exports: [...components, ...modules],
  providers: [
    DynamicDialogConfig,
    DynamicDialogRef,
  ],
})
export class SharedModule { }
