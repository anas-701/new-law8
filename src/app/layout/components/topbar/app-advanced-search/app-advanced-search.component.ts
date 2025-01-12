import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormBaseClass } from 'src/app/@core/classes/form-base.class';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { FormlyConfigModule } from 'src/app/@shared/modules/formly-config/formly-config.module';
import { HighlightPipe } from 'src/app/@shared/pipes/highlight.pipe';
import { SharedModule } from 'src/app/@shared/shared.module';

@Component({
  selector: 'app-advanced-search',
  standalone: true,
  imports: [
    FormlyConfigModule,
    SharedModule,
    HighlightPipe,
    SharedButtonComponent
  ],
  providers: [HighlightPipe],
  templateUrl: './app-advanced-search.component.html',
  styleUrl: './app-advanced-search.component.scss',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible',
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          visibility: 'hidden',
        }),
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
    ]),
  ],
})
export class AppAdvancedSearchComponent implements OnInit {
  isOpen!: boolean;
  searchResult = [
    {
      code: '00012-001',
      name: 'Metwaly Mohamed',
      desc: "Text or description written here",
      category: "Matter"
    }
  ]
  searchValue!: string;
  formly!: FormGroup;
  formlyFields: FormlyFieldConfig[] = []
  formlyModel: any;
  ngOnInit(): void {
    this.initForm()
  }
  initForm(): void {
    this.formlyFields = [
      {
        type: 'input',
        key: 'search',
        className: 'relative text-grey400 border-grey200',
        props: {
          class: 'transition-all duration-200 ease-in-out z-20 ',
          placeholder: 'topBar.search',
          icon: 'icon-search',
          withClear: true,
          attributes: {
            autocomplete: 'off'
          },
          input: (e: any) => {
            this.searchValue = e.target.value
          },
          focus: () => {
            this.isOpen = true
          },
          blur: () => {
            this.isOpen = false

          }
        },


      },
    ];

  }

}
