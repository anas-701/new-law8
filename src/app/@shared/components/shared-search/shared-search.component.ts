import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormlyConfigModule } from '../../modules/formly-config/formly-config.module';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-shared-search',
  standalone: true,
  imports: [
    FormlyConfigModule,
    ReactiveFormsModule
  ],
  templateUrl: './shared-search.component.html',
  styleUrl: './shared-search.component.scss'
})
export class SharedSearchComponent implements OnInit {
  formlyModel: any;
  formlyFields: any[] = [];
  formly: any;
  searchValue: string = '';
  @Output() searchValueChange: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.formlyFields = [
      {
        type: 'input',
        key: 'search',
        className: 'relative text-grey400 border-grey200',
        props: {
          placeholder: 'topBar.search',
          icon: 'icon-search',
          withClear: true,
          attributes: {
            autocomplete: 'off'
          },
          input: (e: any) => {
            this.searchValueChange.emit(e.target.value)
          },
        },


      },
    ];
  }

}
