import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cf-sidebar-menu',
  templateUrl: './cf-sidebar-menu.component.html',
  styleUrls: ['./cf-sidebar-menu.component.scss']
})
export class CfSidebarMenuComponent {
    @Input() items?: ICFSidebarMenuItem[];
}

export interface ICFSidebarMenuItem {
    text?: string;
    link?: string;
    disabled: boolean;
    isSeparator: boolean;
    items?: ICFSidebarMenuItem[];
}

export class CFSidebarMenuItem {
    text?: string;
    link?: string;
    disabled = false;
    isSeparator = false;
    items?: ICFSidebarMenuItem[];

    constructor(text?: string, link?: string) {
        this.text = text;
        this.link = link;
    }

    static createLink(text: string, link: string): ICFSidebarMenuItem {
        return new CFSidebarMenuItem(text, link);
    }

    static createSeparator(): ICFSidebarMenuItem {
        const n = new CFSidebarMenuItem();
        n.isSeparator = true;
        return n;
    }

    static createLinkWithChildItems(text: string, items: ICFSidebarMenuItem[]): ICFSidebarMenuItem {
        const n = new CFSidebarMenuItem(text);
        n.items = items;
        return n;
    }
}