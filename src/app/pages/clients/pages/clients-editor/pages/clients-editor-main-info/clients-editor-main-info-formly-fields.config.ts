import { FormlyFieldConfig } from '@ngx-formly/core';
import { ClientsEditorMainInfoComponent } from './clients-editor-main-info.component';

export function clientsEditorMainInfoFormlyFieldsConfig(THIS: ClientsEditorMainInfoComponent): FormlyFieldConfig[] {
    return [
        {
            fieldGroupClassName: 'grid grid-cols-6 gap-4',
            fieldGroup: [
                {
                    key: 'clientImage',
                    type: 'upload-image',
                    className: 'col-span-6',
                    props: {
                        label: 'Client Image',
                        hint: 'Recommended Size 400*400 ',
                    },
                    expressions: {
                        'props.readonly': 'formState.readonly',
                    },
                },
                {
                    key: 'clientCode',
                    type: 'input',
                    className: 'md:col-span-2',
                    props: {
                        label: 'Client Code',
                        disabled: true,
                        value: THIS.lookupsData.clientCode
                    },
                    expressions: {
                        'props.readonly': 'formState.readonly',
                    },
                },
                {
                    key:
                        THIS._languageService.getSelectedLanguage() == 'en'
                            ? 'nameEn'
                            : 'nameAr',
                    type: 'input',
                    className: 'md:col-span-2',
                    props: {
                        label: 'Client Name',

                    },
                    expressions: {
                        'props.readonly': 'formState.readonly',
                    },
                },
                {
                    key: THIS._languageService.getSelectedLanguage() == 'en'
                    ? 'nameAr'
                    : 'nameEn',
                    type: 'input',
                    className: 'md:col-span-2',
                    props: {
                        label: 'Foreign Name',

                    },
                    expressions: {
                        'props.readonly': 'formState.readonly',
                    },
                },
                {
                    key: 'clientGroupId',
                    type: 'multi-select',
                    className: 'md:col-span-2',
                    props: {
                        label: 'Client Group',
                        optionsArr: THIS.lookupsData.clientGroup,
                        optionLabel: 'name',
                        optionValue: 'id',
                    },
                    expressions: {
                        'props.readonly': 'formState.readonly',
                    },
                },
                {
                    key: 'introducingLawyer',
                    type: 'select',
                    className: 'md:col-span-2',
                    props: {
                        label: 'Introducing Lawyer',
                        optionsArr: THIS.lookupsData.introducingLawyer,
                        optionLabel: 'name',
                        optionValue: 'id',

                    },
                    expressions: {
                        'props.readonly': 'formState.readonly',
                    },
                },
            ]
        },
    ];
}
