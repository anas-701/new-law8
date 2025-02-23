import { FormlyFieldConfig } from "@ngx-formly/core";
import { MatterAddressEditorComponent } from "./matter-address-editor.component";

export function matterAddressFormlyFields(THIS: MatterAddressEditorComponent): FormlyFieldConfig[] {
    return [
        {
            fieldGroupClassName: 'grid gap-4 md:grid-cols-2',
            fieldGroup: [
                {
                    key: 'line1',
                    type: 'input',
                    props: {
                        label: 'Address',
                        required: true,
                    },
                },
                {

                    key: 'zipCode',
                    type: 'input',
                    props: {
                        label: 'Zip Code',
                    },
                },
                {

                    key: 'countryId',
                    type: 'select',
                    props: {
                        label: 'Country',
                        onChange: (e: any) => {
                            THIS.formly?.get('country')?.setValue(e?.originalEvent.target.innerText)
                        }
                    },

                },
                {
                    key: 'country'
                },
                {

                    key: 'city',
                    type: 'select',
                    props: {
                        label: 'City',
                    },
                },
               
                {

                    key: 'state',
                    type: 'select',
                    props: {
                        label: 'State',
                    },
                },
               
            ],
        },
    ];
}