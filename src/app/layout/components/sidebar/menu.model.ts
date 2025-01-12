export interface MenuItem {
    separator?: boolean;
    selected?: boolean;
    active?: boolean;
    items: Array<SubMenuItem>;
}

export interface SubMenuItem {
    icon?: string;
    label: string;
    route: string;
    expanded?: boolean;
    active?: boolean;
    children?: Array<SubMenuItem>;
}
