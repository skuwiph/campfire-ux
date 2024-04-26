import { Component, OnInit, ViewChild } from '@angular/core';
import { CFTableColumn, CfTableColumnAlignment, CfTableColumnType, CFTableData, CFTableFilter, CFTablePaginationOptions, CFTableRow, CfTableSelectedRow } from './ui/cf-table/cf-table.component';
import { CfDialogComponent } from './ui/cf-dialog/cf-dialog.component';
import { CFButtonType } from './ui/cf-button/cf-button.component';
import { CFAlertType } from './ui/cf-alert/cf-alert.component';
import { CfTypeaheadComponent } from './ui/cf-typeahead/cf-typeahead.component';
import { ICFApplicantCardInfo } from './ui/cf-applicant-card/cf-applicant-card.component';
import { Observable, of } from 'rxjs';
import { CFMention } from './ui/cf-mention-text/cf-mention-text.component';
import { UiService } from './ui/ui.service';
import { CFTourElement } from './ui/cf-whats-new/cf-whats-new.component';
import { CFDropdownItem, CFDropdownItemType, CFDropdownOptions } from './ui/cf-dropdown/cf-dropdown.component';
import { CFModalButton } from './ui/cf-modal/cf-modal.component';
import { UiModalService } from './ui/ui-modal.service';

import { HttpClient } from '@angular/common/http';
import { CFLoaderSize, CFLoaderStyle } from './ui/cf-loader/cf-loader.component';
import { CFApplicationCardStatus } from './ui/cf-application-card/cf-application-card.component';
import { CFBannerType } from './ui/cf-banner/cf-banner.component';
import { CfTabComponent, ICFTab } from './ui/cf-tab/cf-tab.component';
import { CFEntityActivity, ICFEntityActivity } from './ui/cf-entity-activity/cf-entity-activity.component';
import { CFStatPanelStyle } from './ui/cf-stat-panel/cf-stat-panel.component';

@Component({
    templateUrl: './control-summary.component.html',
    // styleUrls: ['./app.component.scss']
    styles: [`
  ul.link { list-style-type: none; margin-left: 2rem;}
  ul.link li { display:flex; flex-direction:row; justify-content: flex-start;}
  ul.link li i { width: 1.75rem; }
  .mono { font-family: "Reddit Mono", monospace; }
  .comfort { padding: 0.5rem; }
  .active-msg { margin-top: 0.4rem; }
  .ac-flex, .tour-profile {
    display: flex; 
    flex-direction: row;
    gap: 0.5rem;
    flex-wrap: wrap;
    padding: 0.5rem;
  }
  .cal { margin:0 auto; justify-content: center; }
  .show-background { background-color: lightgray; margin: 0 0 1rem; container: card / inline-size; }
  .white-background { background-color: white; margin: 0 0 1rem; padding: 0.5rem 0.5rem; }
  :host::ng-deep .col_profile { width: 65px; }
  :host::ng-deep .col_artist { width: 10rem; }
  :host::ng-deep .col_album { width: 27rem; }
  :host::ng-deep .col_first { width: 8rem; }
  :host::ng-deep .col_last { width: 10rem; }
  :host::ng-deep .col_status { width: 15rem; }
  .loader { display: flex; flex-direction: column; max-width: 10rem; margin: 0 auto;}
  .status-table { width: 15rem; margin: 1rem 0 1rem 0.25rem; }
  .status-table tr td { line-height: 1.75rem; margin-bottom: 0.1rem; }
  .sample-cards {
    display: flex; flex-direction: row;
    gap: 0.5rem; flex-wrap: wrap; 
    align-items: stretch;
    justify-items: stretch;
    justify-content: space-between;
    flex-grow: 1;
  }
 
  `],
})
export class ControlSummaryComponent implements OnInit {
    title = 'component-showcase';
    Button = CFButtonType;
    Alert = CFAlertType;
    LoaderSize = CFLoaderSize;
    LoaderStyle = CFLoaderStyle;
    CardStatus = CFApplicationCardStatus;
    BannerType = CFBannerType;
    StatPanelStyle = CFStatPanelStyle;

    @ViewChild('dialogDemo', { static: false }) dialog!: CfDialogComponent;
    @ViewChild('typeahead', { static: false }) typeahead!: CfTypeaheadComponent;
    @ViewChild('tabComponent', { static: false }) tabBar!: CfTabComponent;

    constructor(
        private http: HttpClient,
        private uiservice: UiService,
        private modalService: UiModalService
    ) { }
    dropdownOptions?: CFDropdownOptions;

    ngOnInit(): void {

        this.observableData$ = of(
            new CFMention("alanger", "Allen Langer"),
            new CFMention("bbieniek", "Baltazar Bieniek"),
            new CFMention("cfletcher", "Charlotte Fletcher"),
            new CFMention("dwierzbicki", "Dawid Wierzbicki"),
            new CFMention("iseckington", "Ian Seckington"),
            new CFMention("jcook", "Jason Cook"),
            new CFMention("jgilbert", "Jason Gilbert"),
            new CFMention("kmcsweeney", "Kerry McSweeney"),
            new CFMention("mtolfrey", "Michael Tolfrey"),
            new CFMention("nsaleem", "Nabeela Saleem"),
            new CFMention("rhowell", "Richard Howell"),
        );

        this.prepareDropdown();
        this.getRandomImages();
        this.prepareTabs();

        setInterval(() => {
            const v = this.progressValue += Math.floor(Math.random() * 50);
            if (v <= 100) {
                this.setProgressValue(v);
            } else {
                this.setProgressValue(0);
            }
        }, 30000);
    }

    // ENTITY

    entityActivities: ICFEntityActivity[] = [];
    entityActivitiesForTab: ICFEntityActivity[] = [];
    prepareEntityList(): void {
        this.entityActivities.push(
            new CFEntityActivity(undefined, 'Michael', 'Tolfrey', 'yesterday at 14:35', 'This is a test message about the applicant. Ea officia cillum sunt ut duis reprehenderit voluptate amet.\r\nand it\'s very important to know that CRLFs are respected by the display.'),
            new CFEntityActivity(undefined, 'System', '', 'yesterday at 11:00', 'The system did something interesting to the application.'),
            new CFEntityActivity(undefined, 'Orca', '', 'yesterday at 11:00', 'Application was successfully transmitted to ORCA.'),
        );

        this.displayApplicantCards.forEach(ac => {
            this.entityActivities.push(
                new CFEntityActivity(ac.profileUrl, ac.firstName, ac.lastName, 'some date at some time', `${ac.firstName} called about some important thing on their application.`),
                new CFEntityActivity(undefined, ac.firstName, ac.lastName, 'some date at another time', `${ac.firstName} did something exciting.`)
            );
        });

        this.entityActivitiesForTab = this.entityActivities.slice(0, 5);
    }

    // PROGRESS

    progressMax = 100;
    progressValue = 50;
    setProgressValue(value: number): void {
        if (value > this.progressValue || value === 0) {
            this.progressValue = value;
        }
    }

    profilesLoaded = false;
    users: RandomUser[] = [];
    images: string[] = [];
    userStates: string[] = ['PreInterview', 'PostInterview', 'Returner', 'PendingAcceptanceAsReturner', 'ParticipantApplied', 'ParticipantReadyToPlace', 'ParticipantReadyToPlaceMM', 'ParticipantReadyToPlaceGP', 'ParticipantPlaced', 'ParticipantOutOfProgrammeCNX', 'TransferredToORCA', 'AcceptedOnProgramme'];
    testUserPortrait = '';

    getRandomImages(): void {
        this.displayApplicantCards = [];
        this.typeaheadSearchData = [];
        this.http
            .get<RandomUserResults>('https://randomuser.me/api/?results=100')
            .subscribe({
                next: (d: RandomUserResults) => {
                    // console.log(`Got: ${d.results.length} random users`);
                    var count = 0;
                    d.results.forEach(ru => {
                        this.images.push(ru.picture.large);
                        if (count < 6) {
                            this.displayApplicantCards.push(
                                {
                                    applicationId: (count + 10024),
                                    firstName: ru.name.first,
                                    lastName: ru.name.last,
                                    status: this.userStates[Math.floor(Math.random() * this.userStates.length)],
                                    profileUrl: count != 2 ? ru.picture.large : undefined,
                                }
                            );
                        }
                        count++;
                        this.typeaheadSearchData.push(
                            {
                                applicationId: count + 10024,
                                firstName: ru.name.first,
                                lastName: ru.name.last,
                                status: this.userStates[Math.floor(Math.random() * this.userStates.length)],
                                email: ru.email,
                                profile: ru.picture.large,
                            }
                        )
                    });
                    this.testUserPortrait = this.getRandomUrlFromList();

                    this.users = d.results;

                    count = 0;
                    var months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']
                    for(count = 0; count < 5; count++) {
                        console.log(`'${this.users[count].picture.large}', '${this.users[count].name.first} ${this.users[count].name.last}', '${this.users[count + 6].name.first} ${this.users[count + 6].name.last}', '${count + 1}-${months[count]}-2024'`);
                    }

                    this.loadTypeaheadSearch();
                    this.prepareStandardTable();
                    this.prepareEntityList();

                    this.profilesLoaded = true;
                }
            });
    }

    getRandomUrlFromList(): string {
        return this.images[Math.floor(Math.random() * this.images.length)];
    }

    artistFilter?: CFTableFilter;
    hasFilter = false;
    filterText = 'Toggle Only "The Beatles"';
    filterButtonType = CFButtonType.Secondary;
    toggleFilter(): void {
        if (this.hasFilter) {
            this.artistFilter = undefined;
            this.hasFilter = false;
            this.filterText = 'Toggle Only "The Beatles"';
            this.filterButtonType = CFButtonType.Secondary;
        } else {
            this.artistFilter = { column: 0, value: 'The Beatles' };
            this.hasFilter = true;
            this.filterText = 'Clear Toggle';
            this.filterButtonType = CFButtonType.Danger;
        }
    }

    prepareStandardTable(): void {
        var columns: CFTableColumn[] = [
            new CFTableColumn("Artist", CfTableColumnAlignment.Left, CfTableColumnType.String, "col_artist"),
            new CFTableColumn("Album", CfTableColumnAlignment.Left, CfTableColumnType.String, "col_album"),
            new CFTableColumn("Year", CfTableColumnAlignment.Center, CfTableColumnType.Number),
            new CFTableColumn("Position", CfTableColumnAlignment.Right, CfTableColumnType.String)
        ];

        var data = [
            { pk: "01", cols: ["The Beatles", "Please Please Me", "1963", "#1"] },
            { pk: "02", cols: ["The Beatles", "With The Beatles", "1963", "#1"] },
            { pk: "03", cols: ["The Beatles", "A Hard Day’s Night", "1964", "#1"] },
            { pk: "04", cols: ["The Beatles", "Beatles For Sale", "1964", "#1"] },
            { pk: "05", cols: ["The Beatles", "Help!", "1965", "#1"] },
            { pk: "06", cols: ["The Beatles", "Rubber Soul", "1965", "#1"] },
            { pk: "07", cols: ["The Beatles", "Revolver", "1966", "#1"] },
            { pk: "08", cols: ["The Beatles", "Sgt Pepper’s Lonely Hearts Club Band", "1967", "#1"] },
            { pk: "09", cols: ["The Beatles", "The Beatles(White Album)", "1968", "#1"] },
            { pk: "0A", cols: ["The Beatles", "Yellow Submarine", "1969", "#1"] },
            { pk: "0B", cols: ["The Beatles", "Abbey Road", "1969", "#1"] },
            { pk: "0C", cols: ["The Beatles", "Let It Be", "1970", "#1"] },
            { pk: "0D", cols: ["Abba", "Ring Ring", "1973", "--"] },
            { pk: "0E", cols: ["Abba", "Waterloo", "1974", "#28"] },
            { pk: "0F", cols: ["Abba", "ABBA", "1975", "#13"] },
            { pk: "10", cols: ["Abba", "Arrival", "1976", "#1"] },
            { pk: "11", cols: ["Abba", "ABBA: The Album", "1977", "#1"] },
            { pk: "12", cols: ["Abba", "Voulez-Vous", "1979", "#1"] },
            { pk: "13", cols: ["Abba", "Super Trouper", "1980", "#1"] },
            { pk: "14", cols: ["Abba", "The Visitors", "1981", "#1"] },
            { pk: "15", cols: ["Abba", "Voyage", "2021", "#1"] },
            { pk: "1A", cols: ["The Clash", "Sandinista!", "1980", "#19"] },
            { pk: "1B", cols: ["M83", "M83", "2001", "--"] },
        ];

        this.standardTable = new CFTableData(columns.slice(), [...data]);
        //this.paginationTable = new CfTableData(columns.slice(), [...data], new CfTablePaginationOptions(8, data.length));
        this.sortTable = new CFTableData(columns.slice(), [...data]);

        var pscolumns: CFTableColumn[] = [
            new CFTableColumn("", CfTableColumnAlignment.Left, CfTableColumnType.UserProfile, "col_profile"),
            new CFTableColumn("First", CfTableColumnAlignment.Left, CfTableColumnType.String, "col_first"),
            new CFTableColumn("Last", CfTableColumnAlignment.Left, CfTableColumnType.String, "col_last"),
            new CFTableColumn("Email", CfTableColumnAlignment.Left, CfTableColumnType.String),
            new CFTableColumn("Status", CfTableColumnAlignment.Left, CfTableColumnType.UserStatus, "col_status"),
        ];
        var count = 0;
        const results = this.typeaheadSearchData.map((v: TypeaheadResults) => {
            count++;
            const urlOrInitials = count < this.images.length
                ? this.images[count]
                : `${v.firstName.substring(1, 0)}${v.lastName.substring(1, 0)}`;
            return new CFTableRow(`${v.applicationId}`,
                [urlOrInitials, v.firstName, v.lastName, v.email, v.status]
            );
        });
        this.paginationTable = new CFTableData(pscolumns.slice(), results, new CFTablePaginationOptions(10, results.length));
    }

    selectedStandardRow(event: CfTableSelectedRow): void {
        this.modalService.showModalInformation('Selected Row', `Row was selected with PK: ${event.pk}`);
    }

    // Buttons
    primaryClicked(): void {
        this.modalService.showModalInformation('Information', `Primary Button Clicked`);
    }

    // Tabs
    activeTabContent = 'one';
    tabs: ICFTab[] = [];
    prepareTabs(): void {
        this.tabs = [
            { id: 'one', title: 'Comments', disabled: false },
            { id: 'two', title: 'Activity', disabled: false },
            { id: 'three', title: 'Contact Log', disabled: true },
        ];
    }

    onTabSelect(id: string): void {
        this.activeTabContent = id;
    }

    enableTab(id: string): void {
        this.tabBar.enableTab(id);
    }

    disableTab(id: string): void {
        this.tabBar.disableTab(id);
    }

    setActiveTab(id: string): void {
        this.tabBar.selectTabById(id);
   }

    // Dialog
    dialogActiveCount = 0;

    showDialog(event: Event): void {
        this.dialog.openDialog();
    }

    dialogDefault(): void {
        console.log(`dialogDefault: ${this.dialogActiveCount}`);
        this.dialogActiveCount++;
        this.dialog.closeDialog();
    }

    dialogCancel(): void {
        console.log(`Cancelled Dialog`);
        this.dialog.closeDialog();
    }

    isTypeaheadSearching = false;
    typeaheadHasResults = false;
    typeaheadRecordSelected = false;
    loadTypeaheadSearch(): void {
        var columns: CFTableColumn[] = [
            new CFTableColumn("First", CfTableColumnAlignment.Left, CfTableColumnType.String),
            new CFTableColumn("Last", CfTableColumnAlignment.Left, CfTableColumnType.String),
            new CFTableColumn("Email", CfTableColumnAlignment.Left, CfTableColumnType.String),
            new CFTableColumn("Status", CfTableColumnAlignment.Left, CfTableColumnType.UserStatus),
        ];
        this.typeaheadSearchTable = new CFTableData(columns, []);
    }

    doTypeaheadLookup(value: string): void {
        const searchTerm = value.toLocaleLowerCase();

        this.typeaheadSearchTable!.rows = [];
        this.typeaheadHasResults = false;
        this.isTypeaheadSearching = true;

        setTimeout(() => {
            this.typeaheadSearchResults = this.typeaheadSearchData
                .filter((d: TypeaheadResults) => {
                    return d.firstName.toLocaleLowerCase().includes(searchTerm)
                        || d.lastName.toLocaleLowerCase().includes(searchTerm)
                        || d.email.toLocaleLowerCase().includes(searchTerm)
                });

            if (this.typeaheadSearchResults.length > 0) {
                const results = this.typeaheadSearchResults.map((v: TypeaheadResults) => {
                    return new CFTableRow(`${v.applicationId}`, [v.firstName, v.lastName, v.email, v.status]);
                });
                // console.log(`RESULTS: ${JSON.stringify(results)}`);

                this.typeaheadSearchTable!.rows = results.slice(0, 10);
                this.typeaheadHasResults = true;
            }

            this.isTypeaheadSearching = false;
        }, 150);
    }

    selectedCardCount = false;
    typeaheadSelected(event: CfTableSelectedRow): void {
        const pk = parseInt(event.pk);
        const applicant = this.typeaheadSearchData.find(a => a.applicationId == pk);
        if (applicant) {
            //console.log(`applicant: ${JSON.stringify(applicant)}`);
            this.selectedApplicant = undefined;

            setTimeout(() => {
                this.typeahead.closeResults();
                this.typeaheadRecordSelected = true;
                this.selectedApplicant = {
                    applicationId: applicant.applicationId,
                    profileUrl: applicant.profile,
                    firstName: applicant.firstName,
                    lastName: applicant.lastName,
                    status: applicant.status
                };
            }, 150);
        }
    }

    applicantCardSelected(applicationId: number): void {
        this.modalService.showModalInformation('Card Selected', `Selected Card id #${applicationId}`);
    }

    summaryCardClicked(): void {
        this.modalService.showModalInformation('Application Card Selected', `Application Summary card was clicked`);
    }

    observableData$ = new Observable<CFMention>();
    testText = '';
    setMentionText(): void {
        const t = 'Hello, this is some default text, written by <span spellcheck="false" class="mention">@Ian Seckington</span> for the attention of <span spellcheck="false" class="mention">@Michael Tolfrey</span>.<br>';
        const parts = t.split('<');

        parts.forEach(p => {
            if (p.startsWith('span spellcheck="false" class="mention">@')) {
                if (p.length > 22) {
                    const to = p.substring(22);
                    console.log(`Got fullname: ${to}`);
                }
            }
        });

        this.testText = t;
    }

    textChanged(event: string): void {
        console.log(`Changed:`, event)
        this.testText = event;
    }

    // Dropdown / Menu
    prepareDropdown(): void {
        this.dropdownOptions = {
            text: 'Dropdown Menu', showIndicator: true, items: [
                { type: CFDropdownItemType.TextOnly, text: 'Text item', link: 'first' },
                { type: CFDropdownItemType.Separator },
                { type: CFDropdownItemType.ImageAndText, text: 'Image and text item', link: 'second', imageClass: 'fa-solid fa-envelope' },
                { type: CFDropdownItemType.ImageAndText, text: 'Image and text (Disabled)', link: 'third', imageClass: 'fa-solid fa-lock', disabled: true },
            ]
        }
    }

    onDropdownSelected(item: CFDropdownItem): void {
        this.modalService.showModalInformation('Dropdown Item Selected', `Item selected: ${item.link}`);
    }

    // Menu
    menuItem = '';
    prepareMenu(): void {

    }

    menuItemSelected(link: string): void {
        this.menuItem = link;
    }

    inTour = false;
    restoreX = 0;
    restoreY = 0;
    startTour(): void {
        //console.log(`Start tour`);

        const items: CFTourElement[] = [];
        items.push(new CFTourElement("CL:div.container", "This is the menu, which may look different depending on the device you use to view the page.<br><br>The logo will always return you to the home page.", "Main Menu"));
        items.push(new CFTourElement("CL:div.spinner", "This is the loader control, used while network operations are in effect.", "Activity Indicator"));
        items.push(new CFTourElement("CL:div.applicant-card div.image", "This is an example of an applicant card.<br><br>These contain at-a-glance information regarding the applicant.", "Applicant Card"));
        items.push(new CFTourElement("CL:tour-modal-buttons", "The UiModalService provides a programmatic way of calling a standard modal dialog.<br><br>These can display user-defined buttons and respond with the user's selection as necessary.", "Modal Dialogs"));
        items.push(new CFTourElement("CL:div.tour-profile span.image", "The profile images can display either an image or the applicant's initials at a requested size.<br><br>Options exist for rounded or square display.<br><br>This control is also used in its larger configuration for the Applicant Card.", "Profile Image Display"));
        items.push(new CFTourElement("CL:progress.progress-bar", "A simple progress bar for displaying long-running activities", "Progress Indicator"));

        this.restoreX = window.scrollX;
        this.restoreY = window.scrollY;
        this.inTour = true;

        this.uiservice
            .startTour(items)
            .subscribe({
                next: (currentItem: CFTourElement) => {
                    //console.log(`Showing item: ${currentItem.heading ?? 'No heading'}`);
                },
                complete: () => {
                    this.endTour();
                }
            });
    }

    endTour(): void {
        //console.log(`End tour!`);
        this.inTour = false;
        window.scrollTo({ left: this.restoreX, top: this.restoreY, behavior: 'smooth' })
    }

    // MODALS
    modalResponseLast: string = 'Click on buttons above';
    showModalInfo(): void {
        this.modalResponseLast = 'Waiting for user input';
        this.modalService
            .showModalInformation('Here is my title', '<p>This is purely informational</p>')
            .subscribe({
                next: (r: string) => {
                    this.modalResponseLast = `Clicked: '${r}'`;
                },
                complete: () => {
                }
            });
    }

    showModalConfirmation(): void {
        this.modalResponseLast = 'Waiting for user input';
        const b: CFModalButton[] = [
            { id: 'Yes', text: 'Yes', type: CFButtonType.Default },
            { id: 'No', text: 'No', type: CFButtonType.Danger },
            { id: 'Maybe', text: 'Maybe', type: CFButtonType.Secondary }
        ];
        this.modalService
            .showModalConfirmation('Confirmation Required!', '<p>I need to ask you something important!</p><p>Are you sure?</p>', b)
            .subscribe({
                next: (r: string) => {
                    this.modalResponseLast = `Clicked: '${r}'`;
                },
                complete: () => {
                }
            });
    }

    showModalWarning(): void {
        this.modalResponseLast = 'Waiting for user input';
        const b: CFModalButton[] = [
            { id: 'Yes', text: 'Yes', type: CFButtonType.Default },
            { id: 'No', text: 'No', type: CFButtonType.Danger },
        ];
        this.modalService
            .showModalWarning('A Warning!', '<p>Ask not for whom the bell tolls.</p>', b)
            .subscribe({
                next: (r: string) => {
                    this.modalResponseLast = `Clicked: '${r}'`;
                },
                complete: () => {
                }
            })
    }

    showModalError(): void {
        this.modalResponseLast = 'Waiting for user input';
        this.modalService
            .showModalError('Error!', '<p>Something bad happened!</p><p>It really did...</p>')
            .subscribe({
                next: (r: string) => {
                    this.modalResponseLast = `Clicked: '${r}'`;
                },
                complete: () => {
                }
            });
    }

    standardTable?: CFTableData;
    paginationTable?: CFTableData;
    sortTable?: CFTableData;

    typeaheadSearchData: TypeaheadResults[] = [];
    typeaheadSearchResults: TypeaheadResults[] = [];
    typeaheadSearchTable?: CFTableData;
    displayApplicantCards: ICFApplicantCardInfo[] = [];
    selectedApplicant?: ICFApplicantCardInfo;
}

export class TypeaheadResults {
    applicationId: number;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    profile?: string;
    constructor(id: number, f: string, l: string, e: string, s: string, p?: string) {
        this.applicationId = id;
        this.firstName = f;
        this.lastName = l;
        this.email = e;
        this.status = s;
        this.profile = p;
    }
}

interface Name {
    title: string;
    first: string;
    last: string;
}

interface Location {
}

interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
}

interface RandomUser {
    gender: string;
    name: Name;
    location: Location;
    email: string;
    login: Location;
    dob: Location;
    registered: Location;
    phone: string;
    cell: string;
    id: Location;
    picture: Picture;
    nat: string;
}

interface RandomUserResults {
    results: RandomUser[];
}