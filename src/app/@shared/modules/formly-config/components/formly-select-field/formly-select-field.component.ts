import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-select-field',
  templateUrl: './formly-select-field.component.html',
  styleUrl: './formly-select-field.component.scss'
})
export class FormlySelectFieldComponent  extends FieldType <FieldTypeConfig> implements OnInit{
  ngOnInit(): void {
  }
  change(e?: any) {
    if (this.props['onChange']) this.props['onChange'](e, this.field)
  }
}
