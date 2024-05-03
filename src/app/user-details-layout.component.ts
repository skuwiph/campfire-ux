import { Component, OnInit } from '@angular/core';
import { ICFApplicantCardInfo } from './ui/cf-applicant-card/cf-applicant-card.component';
import { CFApplicationCardStatus } from './ui/cf-application-card/cf-application-card.component';
import { ICFTab } from './ui/cf-tab/cf-tab.component';
import { CFBannerType } from './ui/cf-banner/cf-banner.component';
import { CFButtonType } from './ui/cf-button/cf-button.component';
import { CFEntityActivity, ICFEntityActivity } from './ui/cf-entity-activity/cf-entity-activity.component';
import { ICFUser } from './ui/cf-user-profile-stack/cf-user-profile-stack.component';

@Component({
    templateUrl: './user-details-layout.component.html',
    styleUrls: ['./user-details-layout.component.scss'],
})
export class UserDetailsLayoutComponent implements OnInit {
    BannerType = CFBannerType;
    Button = CFButtonType;
    CardStatus = CFApplicationCardStatus;

    ngOnInit(): void {
        this.prepareApplicantCard();
        this.prepareTabs();
        this.prepareEntityList();
        this.prepareUserList();
    }

    applicantCard?: ICFApplicantCardInfo;
    prepareApplicantCard(): void {
        this.applicantCard =
        {
            applicationId: 10024,
            firstName: "Jo",
            lastName: "Parker",
            status: "ParticipantPlaced",
            profileUrl: "https://randomuser.me/api/portraits/women/24.jpg",
        };
    }

    activeTabContent = 'one';
    tabs: ICFTab[] = [];
    prepareTabs(): void {
        this.tabs = [
            { id: 'com', title: 'Comments', disabled: false },
            { id: 'act', title: 'Activity', disabled: false },
            { id: 'con', title: 'Contact Log', disabled: false },
        ];
    }

    entityActivitiesForTab: ICFEntityActivity[] = [];
    prepareEntityList(): void {
        this.entityActivitiesForTab.push(
            new CFEntityActivity(undefined, 'Michael', 'Tolfrey', 'yesterday at 14:35', 'This is a test message about the applicant. Ea officia cillum sunt ut duis reprehenderit voluptate amet.\r\nand it\'s very important to know that CRLFs are respected by the display.'),
            new CFEntityActivity(undefined, 'System', '', 'yesterday at 11:00', 'The system did something interesting to the application.'),
            new CFEntityActivity(undefined, 'Orca', '', 'yesterday at 11:00', 'Application was successfully transmitted to ORCA.'),
        );
    }

    userList: string[] = [];
    users: ICFUser[] = [];
    prepareUserList(): void {
        this.users = [
            { firstName: 'Michael', lastName: 'Tolfrey' },
            { profileUrl: 'https://randomuser.me/api/portraits/women/24.jpg', firstName: 'Jo', lastName: 'Gardiner' },
            { profileUrl: 'https://randomuser.me/api/portraits/women/17.jpg', firstName: 'Eleanor', lastName: 'Parker' },
            { firstName: 'Charlotte', lastName: 'Fletcher' },
            { profileUrl: 'https://randomuser.me/api/portraits/men/7.jpg', firstName: 'John', lastName: 'Grant' },
        ]

        // this.userList = [
        //     'MT', 
        //     'https://randomuser.me/api/portraits/women/94.jpg', 
        //     'https://randomuser.me/api/portraits/women/17.jpg', 
        //     'CF',
        //     'https://randomuser.me/api/portraits/men/7.jpg',
        // ]
    }

    onTabSelect(id: string): void {
        this.activeTabContent = id;
    }

}