import { FormlyFieldConfig } from "@ngx-formly/core";
import { MatterPartyEditorComponent } from "./matter-party-editor.component";

export function matterPartyEditorFieldsConfig(THIS: MatterPartyEditorComponent): FormlyFieldConfig[] {
  return [
    {
      fieldGroupClassName: 'grid gap-4 md:grid-cols-2',
      fieldGroup: [
        {
          key: 'partyTypeId',
          type: 'select',
          props: {
            label: 'Party Type',//THIS._languageService.getTransValue('matters.partyType'),
            required: true,
            optionsArr:[],
            onChange: (e: any) => {
              THIS.formly?.get('partyType')?.setValue(e?.originalEvent.target.innerText)
            }
          },
        },
        {
          key: 'partyType',
        },
        {
          key: 'name',
          type: 'input',
          props: {
            label:'Party Name', //THIS._languageService.getTransValue('matters.partyName'),
            // required: true,
          },
        },
        {
          key: 'law_PartiesDescriptionId',
          type: 'select',
          props: {
            label:'Party', //THIS._languageService.getTransValue('matters.party'),
            optionsArr:[],
            onChange: (e: any) => {
              THIS.formly
                ?.get('law_PartiesDescription')?.setValue(e?.originalEvent.target.innerText);
            },
          },
          expressions: {
            hide: (field: FormlyFieldConfig) => {
              return field.model?.partyTypeId == 6 || field.model?.partyTypeId == 7;
            },
          },
        },
        {
          key: 'law_PartiesDescription',
        },
        {
          key: 'position',
          type: 'select',
          props: {
            label: 'Position',//THIS._languageService.getTransValue('matters.position'),
            // required: true,
          },
          expressions: {
            hide: (field: FormlyFieldConfig) => {
              return field.model?.partyTypeId == 6 || field.model?.partyTypeId == 7;
            },
          },
          hooks: {
            onInit: (field: FormlyFieldConfig) => {
            },
          },
        },
      ],
    },
  ]
}