import { FormlyFieldConfig } from "@ngx-formly/core";
import { MatterAdditionalFilterEditorComponent } from "./matter-additional-filter-editor.component";

export function matterAdditionalFilterFields(THIS:MatterAdditionalFilterEditorComponent):FormlyFieldConfig[]{
    return [
        {
            fieldGroupClassName:'grid md:grid-cols-2 gap-4',
            fieldGroup:[
                {
                    type:'select',
                    key:'clientId',
                    props:{
                        label:'Client',
                        optionsArr:THIS.lookupsData.clients.result.map((obj:any)=>({label:obj.name,value:obj}))
                    }
                },
                {
                    type:'select',
                    key:'practiceArea',
                    props:{
                        label:'Practice Area',
                        optionsArr:['Practice Area 1','Practice Area 2'].map(val=>({label:val,value:val}))
                    }
                },
                {
                    type:'select',
                    key:'category',
                    props:{
                        label:'Category',
                        optionsArr:['Category 1','Category 2'].map(val=>({label:val,value:val}))
                    }
                },
                {
                    type:'select',
                    key:'matterType',
                    props:{
                        label:'Matter Type',
                        optionsArr:['Matter Type 1','Matter Type 2'].map(val=>({label:val,value:val}))
                    }
                },
                {
                    type:'select',
                    key:'status',
                    props:{
                        label:'Status',
                        optionsArr:['Status 1','Status 2'].map(val=>({label:val,value:val}))
                    }
                },
            ]
        }
    ]
}