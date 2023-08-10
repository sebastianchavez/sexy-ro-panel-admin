export interface IMenu {
    text: string;
    route?: string;
    hasSubmenu?: boolean;
    icon?: string;
    submenu?:
    {
        text: string;
        route: string;
        icon?: string;
    }[]
}