import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-formly-radio-button-field',
  standalone: true,
  imports: [RadioButtonModule,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './formly-radio-button-field.component.html',
  styleUrl: './formly-radio-button-field.component.scss'
})
export class FormlyRadioButtonFieldComponent extends FieldType <FieldTypeConfig> {
  optionsArr:any = []
  
  ngOnInit(): void {
    if (this.props.options) {
      this.optionsArr = this.props.options;
    }
  }
}
