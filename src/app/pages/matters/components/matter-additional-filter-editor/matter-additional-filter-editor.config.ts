import { FormlyFieldConfig } from "@ngx-formly/core";
import { MatterAdditionalFilterEditorComponent } from "./matter-additional-filter-editor.component";
import { API_Config } from "src/app/@core/api/api-config/api.config";

export function matterAdditionalFilterFields(THIS: MatterAdditionalFilterEditorComponent): FormlyFieldConfig[] {
    return [
        {
            fieldGroupClassName: 'grid md:grid-cols-2 gap-4',
            fieldGroup: [
                {
                    type: 'select',
                    key: 'clientId',
                    props: {
                        label: 'Client',
                        // optionLabel: 'name',
                        // optionValue: 'id',
                        // endpoint:THIS._apiService.get(API_Config.general.getClients)
                        optionsArr: THIS.lookupsData.clients.result.map((obj: any) => ({ label: obj.name, value: obj }))
                    }
                },
                {
                    type: 'select',
                    key: 'practiceArea',
                    props: {
                        label: 'Practice Area',
                        optionsArr: THIS.lookupsData.practiceArea.result.map((obj: any) => ({ label: obj.name, value: obj })),
                        virtualScroll:true,
                        onChange: (e: any) => {
                            THIS.getMatterCategoryByPracticeAreaOptions(e?.value?.id)
                        }
                        // optionLabel: 'name',
                        // optionValue: 'id',
                        // endpoint:THIS._apiService.get(API_Config.general.getPractsAreaLookup)

                    }
                },
                {
                    type: 'select',
                    key: 'category',
                    props: {
                        label: 'Category',
                        virtualScroll:true,
                        onChange: (e: any) => {
                            THIS.getMatterTypeByMatterCategoryOptions(e?.value?.id)
                        }
                        // optionsArr: []
                        // optionsArr:['Category 1','Category 2'].map(val=>({label:val,value:val}))
                    }
                },
                {
                    type: 'select',
                    key: 'matterType',
                    props: {
                        label: 'Matter Type',
                        virtualScroll:true,
                        // optionsArr: ['Matter Type 1', 'Matter Type 2'].map(val => ({ label: val, value: val }))
                    }
                },
                {
                    type: 'select',
                    key: 'status',
                    props: {
                        label: 'Status',
                        optionsArr: THIS.lookupsData.status.result.map((obj: any) => ({ label: obj.name, value: obj }))
                        // optionsArr: ['Status 1', 'Status 2'].map(val => ({ label: val, value: val }))
                    }
                },
            ]
        }
    ]
}