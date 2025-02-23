import { PracticeArea } from "../../enums/matter-practicearea";
import { MatterStatus } from "../../enums/matter-status";

export const matter = {
    title: 'Al-Massa matter name',
    code: '000123-01',
    law_AppStatus: MatterStatus.NewCase,
    stage:'First Instance',
    descr:"This an example of notes written here in fill width screen with max limit as defined before",
    law_Client: "00018  |  Mohamed ahmed Saad",
    openDate: new Date(),
    closeDate: new Date(),
    branch: 'Dubai',
    law_PractsArea: PracticeArea.IntelecturualProperty,
    law_MtrCat: 'Trademark',
    mtrType: 'Branding',
    jurisdiction: 'jurisdiction',
    judicature: 'judicature',
    courtNumber: '12983',
    tradmarkType: 'Logo',
    attachment: 'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png',
    notes: "This an example of notes written here in fill width screen with max limit as defined before",
    law_ResponsibleLaywer: "Ahmed Saad",
    law_AssignedLaywerList: [
        {
            id: '1',
            name: 'Ahmed Saad Ali',
        },
        {
            id: '2',
            name: 'Ali Saad',
        },
    ],
    law_OtherStaffList: [
        {
            id: '1',
            name: 'Ahmed Saad Ali',
        },
        {
            id: '2',
            name: 'Ali Saad',
        },
        {
            id: '3',
            name: 'Ahmed Saad Ali',
        },
        {
            id: '4',
            name: 'Ali Saad',
        },
    ],
    law_ClientIntroducing: 'Ahmed Saad',
    law_MatterIntroducingLawyer: 'Ahmed Saad',
    law_ReferralType: 'Social Media',
    addresses: [
        {
            line1: "123 Main St",
            line2: "Apt 4B",
            streetNumber: "12",
            city: "New York",
            countryId: "US",
            country: "United States",
            state: "NY",
            zipCode: "10001"
        },
        {
            line1: "456 Elm St",
            line2: "",
            streetNumber: "45",
            city: "Los Angeles",
            countryId: "US",
            country: "United States",
            state: "CA",
            zipCode: "90001"
        }
    ]

}