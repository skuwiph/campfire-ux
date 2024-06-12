import { Component, OnInit } from '@angular/core';
import { CFBannerType } from './ui/cf-banner/cf-banner.component';
import { CFButtonType } from './ui/cf-button/cf-button.component';
import { CFStatPanelStyle } from './ui/cf-stat-panel/cf-stat-panel.component';
import { CFTableColumn, CFTableData, CfTableColumnAlignment, CfTableColumnType } from './ui/cf-table/cf-table.component';
import { CFSidebarMenuItem } from './ui/cf-sidebar-menu/cf-sidebar-menu.component';

@Component({
    templateUrl: './list-layout.component.html',
    styleUrls: ['./list-layout.component.scss']
})
export class ListLayoutComponent implements OnInit {
    BannerType = CFBannerType;
    Button = CFButtonType;
    StatPanelStyle = CFStatPanelStyle;

    showProgress = true;

    ngOnInit(): void {
        this.prepareSideMenu();
        this.prepareStandardTable();
    }

    sidebarMenu?: CFSidebarMenuItem[];
    prepareSideMenu(): void {
        const rm: CFSidebarMenuItem[] = [
            CFSidebarMenuItem.createLink('Approvals', 'references/approvals'),
            CFSidebarMenuItem.createLink('Failed Requests', 'references/bounced'),
            CFSidebarMenuItem.createLink('Late', 'references/late'),
        ];
        const sm: CFSidebarMenuItem[] = [
            CFSidebarMenuItem.createLink('Medical', 'issues/medical'),
            CFSidebarMenuItem.createLink('Criminal', 'issues/criminal'),
        ];
        const i: CFSidebarMenuItem[] = [
            CFSidebarMenuItem.createLinkWithChildItems('References', rm),
            CFSidebarMenuItem.createSeparator(),
            CFSidebarMenuItem.createLinkWithChildItems('Issues', sm),
        ];

        this.sidebarMenu = i.slice();
        // console.log(`Menu: ${JSON.stringify(this.sidebarMenu,null,2)}`);
    }

    standardTable?: CFTableData;
    prepareStandardTable(): void {
        var columns: CFTableColumn[] = [
            new CFTableColumn("", CfTableColumnAlignment.Center, CfTableColumnType.UserProfile, "col_artist"),
            new CFTableColumn("Name", CfTableColumnAlignment.Left, CfTableColumnType.String, "col_artist"),
            new CFTableColumn("Referee", CfTableColumnAlignment.Left, CfTableColumnType.String, "col_album"),
            new CFTableColumn("Reference Submitted Date", CfTableColumnAlignment.Center, CfTableColumnType.Date),
        ];

        var data = [
            { pk: "1", cols: ['https://randomuser.me/api/portraits/men/25.jpg', 'Cipriano Farias', 'Virginia León', '1-Sep-2024'] },
            { pk: "2", cols: ['https://randomuser.me/api/portraits/women/86.jpg', 'Clarice Turner', 'Iekaterina Stepura', '2-Oct-2024'] },
            { pk: "3", cols: ['https://randomuser.me/api/portraits/women/24.jpg', 'Sasha Leclerc', 'Maya Hellevik', '3-Nov-2024'] },
            { pk: "4", cols: ['https://randomuser.me/api/portraits/women/79.jpg', 'Sophie Bartmann', 'Deniz Okumuş', '4-Dec-2024'] },
            { pk: "5", cols: ['https://randomuser.me/api/portraits/men/31.jpg', 'Ahmet Adal', 'Oliver Young', '5-Jan-2024'] },
        ];

        this.standardTable = new CFTableData(columns.slice(), [...data]);
    }
}