import { Component, OnInit, ViewChild } from '@angular/core';
import { CfTableColumn, CfTableColumnAlignment, CfTableColumnType, CfTableData, CfTablePaginationOptions, CfTableRow, CfTableSelectedRow } from './ui/cf-table/cf-table.component';
import { CfDialogComponent } from './ui/cf-dialog/cf-dialog.component';
import { CfButtonType } from './ui/cf-button/cf-button.component';
import { CfAlertType } from './ui/cf-alert/cf-alert.component';
import { CfTypeaheadComponent } from './ui/cf-typeahead/cf-typeahead.component';
import { ICfApplicantCardInfo } from './ui/cf-applicant-card/cf-applicant-card.component';
import { Observable, of } from 'rxjs';
import { CFMention } from './ui/cf-mention-text/cf-mention-text.component';
import { UiService } from './ui/ui.service';
import { CFTourElement } from './ui/cf-whats-new/cf-whats-new.component';
import { CFDropdownItem, CFDropdownItemType, CFDropdownOptions } from './ui/cf-dropdown/cf-dropdown.component';

@Component({
  templateUrl: './control-summary.component.html',
  // styleUrls: ['./app.component.scss']
  styles: [`
  ul.link { list-style-type: none; margin-left: 2rem;}
  ul.link li { display:flex; flex-direction:row; justify-content: flex-start;}
  ul.link li i { width: 1.75rem; }
  .mono { font-family: monospace }
  .comfort { padding: 0.5rem; }
  .active-msg { margin-top: 0.4rem; }
  :host::ng-deep .col_artist { width: 10rem; }
  :host::ng-deep .col_album { width: 27rem; }
  :host::ng-deep .col_first { width: 8rem; }
  :host::ng-deep .col_last { width: 10rem; }
  :host::ng-deep .col_status { width: 15rem; }
  .status-table { width: 15rem; margin: 1rem 0 1rem 0.25rem; }
  .status-table tr td { line-height: 1.75rem; margin-bottom: 0.1rem; }
  :host::ng-deep button i { margin-left: 0.5rem; }
  :host::ng-deep .dropdown { padding: 0.5rem; border-radius: 0.2rem; }
  :host::ng-deep .dropdown .dropdown-content { margin: 0.5rem 0 0 -0.5rem; width: 15rem; }
  `],
})
export class ControlSummaryComponent implements OnInit {
    title = 'component-showcase';
    Button = CfButtonType;
    Alert = CfAlertType;

    @ViewChild('dialogDemo', { static: false }) dialog!: CfDialogComponent;
    @ViewChild('typeahead', { static: false }) typeahead!: CfTypeaheadComponent;

    constructor(private uiservice: UiService) {}
    dropdownOptions?: CFDropdownOptions;

    ngOnInit(): void {
        this.loadTypeaheadSearch();
        this.prepareStandardTable();
        this.displayApplicantCard = {
            applicationId: 1234567,
            profileUrl: 'https://campamericalive.s3.amazonaws.com/resources/2023/893825/I/893825-80249724-8bea-43f0-b84c-745434346baf',
            firstName: 'Meghan',
            lastName: 'Geofferson',
            status: 'ParticipantPlaced'
        };

        this.observableData$ = of(
            new CFMention( "alanger",  "Allen Langer" ),
            new CFMention( "bbieniek",  "Baltazar Bieniek" ),
            new CFMention( "cfletcher", "Charlotte Fletcher" ),
            new CFMention( "dwierzbicki", "Dawid Wierzbicki" ),
            new CFMention( "iseckington", "Ian Seckington" ),
            new CFMention( "jcook",  "Jason Cook" ),
            new CFMention( "jgilbert", "Jason Gilbert" ),
            new CFMention( "kmcsweeney", "Kerry McSweeney" ),
            new CFMention( "mtolfrey",  "Michael Tolfrey" ),
            new CFMention( "nsaleem",  "Nabeela Saleem" ),
            new CFMention( "rhowell",  "Richard Howell" ),
        );

        this.prepareDropdown();
    }

    prepareStandardTable(): void {
        var columns: CfTableColumn[] = [
            new CfTableColumn("Artist", CfTableColumnAlignment.Left, CfTableColumnType.String, "col_artist"),
            new CfTableColumn("Album", CfTableColumnAlignment.Left, CfTableColumnType.String, "col_album"),
            new CfTableColumn("Year", CfTableColumnAlignment.Center, CfTableColumnType.Number),
            new CfTableColumn("Position", CfTableColumnAlignment.Right, CfTableColumnType.String)
        ];

        var data = [
            { pk: "01", cols: ["The Beatles", "Please Please Me", "1963", "#1" ]},
            { pk: "02", cols: ["The Beatles", "With The Beatles","1963", "#1"] },
            { pk: "03", cols: ["The Beatles", "A Hard Day’s Night","1964", "#1"] },
            { pk: "04", cols: ["The Beatles", "Beatles For Sale","1964", "#1"] },
            { pk: "05", cols: ["The Beatles", "Help!","1965", "#1"] },
            { pk: "06", cols: ["The Beatles", "Rubber Soul","1965", "#1"] },
            { pk: "07", cols: ["The Beatles", "Revolver","1966", "#1"] },
            { pk: "08", cols: ["The Beatles", "Sgt Pepper’s Lonely Hearts Club Band","1967", "#1"] },
            { pk: "09", cols: ["The Beatles", "The Beatles(White Album)","1968", "#1"] },
            { pk: "0A", cols: ["The Beatles", "Yellow Submarine","1969", "#1"] },
            { pk: "0B", cols: ["The Beatles", "Abbey Road","1969", "#1"] },
            { pk: "0C", cols: ["The Beatles", "Let It Be","1970", "#1"] },
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

        this.standardTable = new CfTableData(columns.slice(), [...data]);
        //this.paginationTable = new CfTableData(columns.slice(), [...data], new CfTablePaginationOptions(8, data.length));
        this.sortTable = new CfTableData(columns.slice(), [...data]);

        var pscolumns: CfTableColumn[] = [
            new CfTableColumn("", CfTableColumnAlignment.Left, CfTableColumnType.UserProfile),
            new CfTableColumn("First", CfTableColumnAlignment.Left, CfTableColumnType.String, "col_first"),
            new CfTableColumn("Last", CfTableColumnAlignment.Left, CfTableColumnType.String, "col_last"),
            new CfTableColumn("Email", CfTableColumnAlignment.Left, CfTableColumnType.String),
            new CfTableColumn("Status", CfTableColumnAlignment.Left, CfTableColumnType.UserStatus, "col_status"),
        ];
        var count = 0;
        const results = this.typeaheadSearchData.map((v: TypeaheadResults) => {
            count++;
            const urlOrInitials = count < 3
                ? (count == 1 
                    ? 'https://campamericalive.s3.amazonaws.com/resources/2022/815074/I/815074-75d4cb74-23d9-4974-988f-35d60a3f2c8c' 
                    : 'https://campamericalive.s3.amazonaws.com/resources/2023/893825/I/893825-80249724-8bea-43f0-b84c-745434346baf')
                : `${v.firstName.substring(1, 0)}${v.lastName.substring(1, 0)}`;
            return new CfTableRow(`${v.applicationId}`, 
                [urlOrInitials, v.firstName, v.lastName, v.email, v.status]
            );
        });        
        this.paginationTable = new CfTableData(pscolumns.slice(), results, new CfTablePaginationOptions(10, results.length));        
    }

    selectedStandardRow(event: CfTableSelectedRow): void {
        console.log(`Row was selected with PK: ${event.pk}`);
    }

    // Buttons
    primaryClicked(): void {
        window.alert(`Primary Button Clicked`);
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
        this.typeaheadSearchData = [
            { applicationId: 902209, firstName: "Hayleigh", lastName: "Baker", email: "4080621@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 889617, firstName: "Sarah", lastName: "Fletcher", email: "4183464@testmail.com", status: "Returner" },
            { applicationId: 900558, firstName: "Hawk", lastName: "Clarke", email: "4467983@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 896862, firstName: "Joshua", lastName: "Mullally", email: "4516325@testmail.com", status: "Returner" },
            { applicationId: 905085, firstName: "Madison", lastName: "Hall", email: "4516346@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 894806, firstName: "Olivea", lastName: "Crothers", email: "4566075@testmail.com", status: "Returner" },
            { applicationId: 911688, firstName: "Milly", lastName: "Crothers", email: "4567847@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 902626, firstName: "Briea", lastName: "Mcintosh", email: "4582394@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 891407, firstName: "Franchesca", lastName: "Spittles-Jones", email: "4643735@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 904077, firstName: "Taryn", lastName: "Slee", email: "4653518@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 907530, firstName: "Jackson", lastName: "Pugh", email: "4662886@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 910719, firstName: "Liana", lastName: "Smith", email: "4663878@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 912678, firstName: "Jessica", lastName: "O'connor", email: "4673567@testmail.com", status: "Returner" },
            { applicationId: 908697, firstName: "Georgia", lastName: "Mccloskey", email: "4701678@testmail.com", status: "ParticipantApplied" },
            { applicationId: 911079, firstName: "Lucy", lastName: "Seatter", email: "4703791@testmail.com", status: "ParticipantReadyToPlaceMM" },
            { applicationId: 888826, firstName: "Alivia", lastName: "Bates", email: "4715661@testmail.com", status: "PreInterview" },
            { applicationId: 907147, firstName: "Brydon", lastName: "Duggan", email: "4715752@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 895556, firstName: "Dayna", lastName: "Loomans-Johns", email: "4716548@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 901201, firstName: "Eliana", lastName: "Lardner", email: "4716931@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 902605, firstName: "Victoria", lastName: "Haig", email: "4719607@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 895142, firstName: "Kezia", lastName: "Knight", email: "4719718@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 908456, firstName: "Shania", lastName: "Harkerss", email: "4720162@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 886854, firstName: "Jade", lastName: "Edwards", email: "4721284@testmail.com", status: "PreInterview" },
            { applicationId: 908066, firstName: "Morgan", lastName: "Jorey", email: "4722194@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 911944, firstName: "Siobhan", lastName: "Frost", email: "4724065@testmail.com", status: "PreInterview" },
            { applicationId: 896398, firstName: "Oliver", lastName: "Webber", email: "4756136@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 905343, firstName: "Abbey", lastName: "Heale", email: "4756268@testmail.com", status: "ParticipantApplied" },
            { applicationId: 912101, firstName: "Angelina", lastName: "Carson", email: "4760220@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 903345, firstName: "Kristian", lastName: "Millard", email: "4765172@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 911683, firstName: "Connor", lastName: "Shaw", email: "4772456@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 900767, firstName: "Georgia", lastName: "Eilering", email: "4775609@testmail.com", status: "Returner" },
            { applicationId: 891072, firstName: "Stephanie", lastName: "Mcintyre", email: "4790513@testmail.com", status: "PreInterview" },
            { applicationId: 912413, firstName: "Keegan", lastName: "Prisk", email: "4790529@testmail.com", status: "ParticipantApplied" },
            { applicationId: 902708, firstName: "Lara", lastName: "Wilson", email: "4791332@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 890858, firstName: "Cydney", lastName: "Ralph", email: "4791913@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 903912, firstName: "Jacinta", lastName: "O'reilly", email: "4791936@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 895827, firstName: "Amy", lastName: "Rowse", email: "4792075@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 902596, firstName: "Rubee-Layne", lastName: "Steigenberger", email: "4792988@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 904435, firstName: "Shannon", lastName: "Michelle", email: "4795012@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 903101, firstName: "Harriet", lastName: "Powell", email: "4797131@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 901771, firstName: "Andrae", lastName: "De Vries", email: "4799696@testmail.com", status: "Returner" },
            { applicationId: 896743, firstName: "Thomas", lastName: "Muir", email: "4800517@testmail.com", status: "PreInterview" },
            { applicationId: 908674, firstName: "Abby", lastName: "Burgess", email: "4800845@testmail.com", status: "PreInterview" },
            { applicationId: 905559, firstName: "Hannah", lastName: "Ussher", email: "4800872@testmail.com", status: "ParticipantApplied" },
            { applicationId: 894619, firstName: "Laura", lastName: "Polo", email: "4818084@testmail.com", status: "Returner" },
            { applicationId: 897567, firstName: "Nivaryn", lastName: "Dane", email: "4818829@testmail.com", status: "ParticipantApplied" },
            { applicationId: 886197, firstName: "Caitlyn", lastName: "Jenkins", email: "4819569@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 891182, firstName: "Molly", lastName: "Cain", email: "4825288@testmail.com", status: "ParticipantApplied" },
            { applicationId: 907869, firstName: "Regan", lastName: "Lippitt", email: "4826022@testmail.com", status: "ParticipantApplied" },
            { applicationId: 886590, firstName: "Savannah", lastName: "Laws", email: "4826370@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 911224, firstName: "Zalome", lastName: "Anderson", email: "4831559@testmail.com", status: "Returner" },
            { applicationId: 889975, firstName: "Olivia", lastName: "Evans", email: "4845070@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 906271, firstName: "Shannon", lastName: "Calkin", email: "4858655@testmail.com", status: "PreInterview" },
            { applicationId: 887008, firstName: "Amy", lastName: "Bonner", email: "4874126@testmail.com", status: "RejectedByOffice" },
            { applicationId: 894673, firstName: "Piper", lastName: "Gregory", email: "4875232@testmail.com", status: "ParticipantApplied" },
            { applicationId: 899869, firstName: "Jorja", lastName: "Mouat", email: "4898220@testmail.com", status: "Returner" },
            { applicationId: 910686, firstName: "Angela", lastName: "Strang", email: "4899458@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 905066, firstName: "Tyra", lastName: "Campbell", email: "4899773@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 903220, firstName: "Emily", lastName: "Flower", email: "4901246@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 906921, firstName: "Abigail", lastName: "Davis", email: "4902232@testmail.com", status: "ParticipantApplied" },
            { applicationId: 899053, firstName: "Sophie", lastName: "Gilmore", email: "4913243@testmail.com", status: "PreInterview" },
            { applicationId: 902483, firstName: "Trent", lastName: "Mccoy", email: "4913330@testmail.com", status: "ParticipantApplied" },
            { applicationId: 906477, firstName: "Maria", lastName: "Bullen", email: "4913410@testmail.com", status: "PreInterview" },
            { applicationId: 906031, firstName: "Liutu", lastName: "Gaualofa", email: "4915028@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 900398, firstName: "Harrison", lastName: "Wehi", email: "4918397@testmail.com", status: "PostInterview" },
            { applicationId: 909179, firstName: "Michelle", lastName: "Coutts", email: "4919931@testmail.com", status: "Returner" },
            { applicationId: 907164, firstName: "Pantera", lastName: "Hape", email: "4921757@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 901410, firstName: "Grace", lastName: "Kemp", email: "4921854@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 910437, firstName: "Luke", lastName: "Dravitzki", email: "4922761@testmail.com", status: "Returner" },
            { applicationId: 909466, firstName: "Paige", lastName: "Stephenson", email: "4923850@testmail.com", status: "Returner" },
            { applicationId: 895468, firstName: "Olivia", lastName: "Evans", email: "4924230@testmail.com", status: "AcceptedOnProgramme" },
            { applicationId: 911040, firstName: "Zak", lastName: "Osborne", email: "4927645@testmail.com", status: "ParticipantApplied" },
            { applicationId: 907772, firstName: "Madison", lastName: "Cullen", email: "4929576@testmail.com", status: "Returner" },
            { applicationId: 906128, firstName: "Jacob", lastName: "Martin", email: "4931295@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 886456, firstName: "Riley", lastName: "Tyson", email: "4931599@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 905953, firstName: "Thomas", lastName: "Escott", email: "4934113@testmail.com", status: "ParticipantApplied" },
            { applicationId: 905546, firstName: "Shanay", lastName: "Clapp", email: "4935255@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 903896, firstName: "Cameron", lastName: "Dufty", email: "4936132@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 908217, firstName: "Nikau", lastName: "Barbarich", email: "4937538@testmail.com", status: "ParticipantApplied" },
            { applicationId: 909160, firstName: "Casey", lastName: "Herbert", email: "4938577@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 899661, firstName: "Jessica", lastName: "Peterson", email: "4938659@testmail.com", status: "Returner" },
            { applicationId: 906804, firstName: "Hannah", lastName: "Lugtigheid", email: "4940570@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 901594, firstName: "Joshua", lastName: "Brookland", email: "4940575@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 896159, firstName: "Macy", lastName: "Hare", email: "4941742@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 902828, firstName: "Shannon", lastName: "Butt", email: "4942437@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 901965, firstName: "Jessalyn", lastName: "Richards", email: "4942931@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 889801, firstName: "Jessica", lastName: "Benson", email: "4944441@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 895948, firstName: "Alexis", lastName: "Broughton", email: "4945874@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 904721, firstName: "Riley", lastName: "Broomhall", email: "4946822@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 903357, firstName: "Amber", lastName: "Blackburn", email: "4947013@testmail.com", status: "PreInterview" },
            { applicationId: 895670, firstName: "Coby", lastName: "Branch", email: "4947016@testmail.com", status: "PreInterview" },
            { applicationId: 901736, firstName: "Alesha", lastName: "Bullen", email: "4947353@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 895133, firstName: "Kristen", lastName: "Taylor", email: "4947548@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 900318, firstName: "Ella", lastName: "Booth", email: "4948037@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 904298, firstName: "Ellie", lastName: "Hopkins", email: "4948713@testmail.com", status: "Returner" },
            { applicationId: 903076, firstName: "Amy-Lee", lastName: "Taylor", email: "4948718@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 896841, firstName: "Fraser", lastName: "Bray", email: "4948829@testmail.com", status: "Returner" },
            { applicationId: 896067, firstName: "Delmar", lastName: "Banks", email: "4949369@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 910746, firstName: "Harry", lastName: "Mclean", email: "4949370@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 895896, firstName: "Isabella", lastName: "Trewern", email: "4950480@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 911251, firstName: "William", lastName: "Spice", email: "4950629@testmail.com", status: "Returner" },
            { applicationId: 895920, firstName: "Bryher", lastName: "Mclachlan", email: "4950748@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 906003, firstName: "Amy", lastName: "Reddish", email: "4950836@testmail.com", status: "Returner" },
            { applicationId: 908795, firstName: "Jaime", lastName: "Sleator", email: "4950875@testmail.com", status: "Returner" },
            { applicationId: 895351, firstName: "Brooke", lastName: "Lee", email: "4952244@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 910110, firstName: "Jesse", lastName: "Beeforth", email: "4952440@testmail.com", status: "Returner" },
            { applicationId: 899332, firstName: "Emma", lastName: "Scammell", email: "4952730@testmail.com", status: "Returner" },
            { applicationId: 887334, firstName: "Alberta", lastName: "Austin", email: "4952974@testmail.com", status: "PreInterview" },
            { applicationId: 901072, firstName: "Calad", lastName: "Twohig", email: "4953209@testmail.com", status: "ParticipantApplied" },
            { applicationId: 905679, firstName: "Emma", lastName: "Pawsey", email: "4953318@testmail.com", status: "Returner" },
            { applicationId: 902635, firstName: "Jacob", lastName: "Tallentire", email: "4953320@testmail.com", status: "AcceptedOnProgramme" },
            { applicationId: 903576, firstName: "Charlie", lastName: "Griffiths-Meehan", email: "4953333@testmail.com", status: "AcceptedOnProgramme" },
            { applicationId: 896037, firstName: "Elliot", lastName: "Vanderspeck", email: "4953336@testmail.com", status: "Returner" },
            { applicationId: 902608, firstName: "Phoebe", lastName: "Dougherty", email: "4953342@testmail.com", status: "ParticipantApplied" },
            { applicationId: 903457, firstName: "Jayden", lastName: "Sincock", email: "4953581@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 895829, firstName: "Holly", lastName: "Fairclough", email: "4955008@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 904335, firstName: "Teagan", lastName: "Price", email: "4955723@testmail.com", status: "Returner" },
            { applicationId: 898146, firstName: "Amy", lastName: "Keating", email: "4955744@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 902590, firstName: "Hannah", lastName: "Richardson", email: "4955758@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 905860, firstName: "Christina", lastName: "Burrell", email: "4956148@testmail.com", status: "Returner" },
            { applicationId: 897559, firstName: "Livia", lastName: "Ashton", email: "4956484@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 898995, firstName: "Brooke", lastName: "Begg-Smith", email: "4956584@testmail.com", status: "Returner" },
            { applicationId: 898728, firstName: "Megan", lastName: "Forrester", email: "4957338@testmail.com", status: "Returner" },
            { applicationId: 903884, firstName: "Samantha", lastName: "Green", email: "4957347@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 895423, firstName: "Lucy", lastName: "Carlson", email: "4957514@testmail.com", status: "PreInterview" },
            { applicationId: 894631, firstName: "Mackenzie", lastName: "Christie", email: "4957529@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 906159, firstName: "Madison", lastName: "Allott", email: "4957990@testmail.com", status: "Returner" },
            { applicationId: 906813, firstName: "Caitlin", lastName: "Wilson", email: "4958370@testmail.com", status: "Returner" },
            { applicationId: 886573, firstName: "Camryn", lastName: "Lyon", email: "4958586@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 892433, firstName: "Rose", lastName: "Clarke", email: "4958709@testmail.com", status: "PreInterview" },
            { applicationId: 898823, firstName: "Aidan", lastName: "Carson", email: "4958796@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 896761, firstName: "Demi", lastName: "Melton", email: "4958920@testmail.com", status: "Returner" },
            { applicationId: 901974, firstName: "Aimee", lastName: "Kelly-Neville", email: "4958926@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 911034, firstName: "Emma", lastName: "Gadsby", email: "4959360@testmail.com", status: "ParticipantApplied" },
            { applicationId: 912693, firstName: "Meg", lastName: "Gibson", email: "4959768@testmail.com", status: "ParticipantApplied" },
            { applicationId: 901966, firstName: "Emily", lastName: "Wilson", email: "4960137@testmail.com", status: "ParticipantOutOfProgrammeFAI" },
            { applicationId: 903699, firstName: "Alison", lastName: "Bartlett", email: "4960153@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 902172, firstName: "Kayce", lastName: "Poata", email: "4960281@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 905684, firstName: "Kayley", lastName: "Teague", email: "4961081@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 911678, firstName: "Delaney", lastName: "Cotes", email: "4961541@testmail.com", status: "Returner" },
            { applicationId: 908838, firstName: "Lauran", lastName: "Kennedy", email: "4961644@testmail.com", status: "Returner" },
            { applicationId: 911650, firstName: "Symantha", lastName: "Pope", email: "4961654@testmail.com", status: "Returner" },
            { applicationId: 896696, firstName: "Joshua", lastName: "Kendall", email: "4964661@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 902199, firstName: "Emma", lastName: "Lawrence", email: "4965881@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 902213, firstName: "Piper", lastName: "Curtiss", email: "4966353@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 900911, firstName: "Maggie", lastName: "Culloty", email: "4966659@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 896593, firstName: "Sean", lastName: "Hapi", email: "4967043@testmail.com", status: "Returner" },
            { applicationId: 903256, firstName: "Cassidy", lastName: "Yates", email: "4967261@testmail.com", status: "ParticipantApplied" },
            { applicationId: 896126, firstName: "Rachel", lastName: "Bluck", email: "4967285@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 900907, firstName: "Margaret", lastName: "Matthews", email: "4968055@testmail.com", status: "AcceptedOnProgramme" },
            { applicationId: 907403, firstName: "Abigail", lastName: "Keppel", email: "4968402@testmail.com", status: "Returner" },
            { applicationId: 909898, firstName: "Zoe", lastName: "De Reuck", email: "4969888@testmail.com", status: "Returner" },
            { applicationId: 902348, firstName: "Alexi", lastName: "Templer", email: "4970105@testmail.com", status: "Returner" },
            { applicationId: 897447, firstName: "Micah", lastName: "Geldard", email: "4970756@testmail.com", status: "ParticipantApplied" },
            { applicationId: 907874, firstName: "Peta", lastName: "Apineru", email: "4971064@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 905547, firstName: "Michael", lastName: "Cook", email: "4971216@testmail.com", status: "Returner" },
            { applicationId: 911680, firstName: "Patrick", lastName: "Shepherd", email: "4971833@testmail.com", status: "PreInterview" },
            { applicationId: 899059, firstName: "Natasha", lastName: "Wallace", email: "4972433@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 893279, firstName: "Alisa", lastName: "Barron", email: "4972763@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 887707, firstName: "Ava", lastName: "Page-Wood", email: "4972994@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 902794, firstName: "Kalin", lastName: "Mcinnes", email: "4973515@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 904223, firstName: "Charlotte", lastName: "Boyd", email: "4973892@testmail.com", status: "Returner" },
            { applicationId: 901162, firstName: "Ethan", lastName: "Te Tai", email: "4975902@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 887219, firstName: "Amy", lastName: "Bonner", email: "4977563@testmail.com", status: "PreInterview" },
            { applicationId: 912123, firstName: "Joel", lastName: "Proudfoot", email: "4977570@testmail.com", status: "ParticipantApplied" },
            { applicationId: 886029, firstName: "Caitlin", lastName: "Kingsland", email: "4977572@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 912565, firstName: "Shakaiya", lastName: "Wright", email: "4977574@testmail.com", status: "Returner" },
            { applicationId: 903575, firstName: "Joel", lastName: "Gouman", email: "4977773@testmail.com", status: "Returner" },
            { applicationId: 894388, firstName: "Islay", lastName: "Harley", email: "4978581@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 886632, firstName: "Meg", lastName: "Hansen", email: "4979421@testmail.com", status: "ParticipantApplied" },
            { applicationId: 904356, firstName: "Johannes", lastName: "Brown", email: "4979998@testmail.com", status: "ParticipantApplied" },
            { applicationId: 891822, firstName: "Mackenzie", lastName: "Shaw", email: "4981023@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 911834, firstName: "Nathan", lastName: "Moffat", email: "4982020@testmail.com", status: "ParticipantApplied" },
            { applicationId: 888214, firstName: "Zoe", lastName: "Marino", email: "4982511@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 886565, firstName: "Tamsin", lastName: "Cleghorn", email: "4983524@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 887928, firstName: "Keely-Ann", lastName: "Buxton", email: "4983551@testmail.com", status: "ParticipantApplied" },
            { applicationId: 905215, firstName: "Bailey", lastName: "Reddish", email: "4983806@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 892070, firstName: "Nikita", lastName: "Jacobs", email: "4983811@testmail.com", status: "ParticipantOutOfProgrammeREJ" },
            { applicationId: 902782, firstName: "Alexis", lastName: "Cross", email: "4984023@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 893176, firstName: "Jane", lastName: "Mckenzie", email: "4985725@testmail.com", status: "AcceptedOnProgramme" },
            { applicationId: 909914, firstName: "Helena", lastName: "James", email: "4986049@testmail.com", status: "Returner" },
            { applicationId: 911828, firstName: "William", lastName: "Court", email: "4989151@testmail.com", status: "Returner" },
            { applicationId: 906379, firstName: "Paige", lastName: "Dumbleton", email: "4990351@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 911509, firstName: "Sebastian", lastName: "Schroeder", email: "4990407@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 894245, firstName: "Finn", lastName: "Rosoman", email: "4990410@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 889880, firstName: "Isabella", lastName: "Shatford", email: "4990431@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 904366, firstName: "Jacob", lastName: "Skelton", email: "4990581@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 888756, firstName: "Annabelle", lastName: "Chapman", email: "4991065@testmail.com", status: "ParticipantApplied" },
            { applicationId: 902835, firstName: "Jonothan", lastName: "Corry", email: "4991993@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 887565, firstName: "Kyan", lastName: "Golding", email: "4992501@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 896134, firstName: "Georgia", lastName: "Shivnan", email: "4992707@testmail.com", status: "PreInterview" },
            { applicationId: 897627, firstName: "Almira", lastName: "Bell", email: "4993302@testmail.com", status: "PreInterview" },
            { applicationId: 886460, firstName: "Jack", lastName: "Macnaught", email: "4994607@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 888441, firstName: "Alyse", lastName: "Berger", email: "4994739@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 892368, firstName: "Yasmine", lastName: "Regos", email: "4995253@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 887353, firstName: "Breanna", lastName: "Cherry", email: "4996150@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 886855, firstName: "Clare", lastName: "Frame", email: "4996220@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 886090, firstName: "Trisha Mae", lastName: "Danila", email: "4996242@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 886199, firstName: "Kalib", lastName: "Schuler", email: "4996305@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 886385, firstName: "Ava", lastName: "Bullen", email: "4996311@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 886094, firstName: "Phillipa", lastName: "Garrity", email: "4996378@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 888394, firstName: "Arnika", lastName: "Dale", email: "4996520@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 886028, firstName: "Natasha", lastName: "Mckearney", email: "4996583@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 886030, firstName: "Kacie", lastName: "Eagle", email: "4996584@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 886031, firstName: "Marlow", lastName: "Friend", email: "4996585@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 886032, firstName: "Dante", lastName: "Bishop", email: "4996586@testmail.com", status: "PreInterview" },
            { applicationId: 886035, firstName: "Alexa", lastName: "Baldwin", email: "4996590@testmail.com", status: "PreInterview" },
            { applicationId: 886038, firstName: "Callum", lastName: "Newcombe", email: "4996594@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 886040, firstName: "Alejandra", lastName: "Ayers", email: "4996596@testmail.com", status: "PreInterview" },
            { applicationId: 886092, firstName: "Alisa", lastName: "Barron", email: "4996694@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 886100, firstName: "Alyse", lastName: "Berger", email: "4996706@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 886130, firstName: "Amelie", lastName: "Blair", email: "4996748@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 886139, firstName: "Jordyn", lastName: "Rhodes", email: "4996757@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 886153, firstName: "Deangelo", lastName: "Atkinson", email: "4996775@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 886380, firstName: "Carys", lastName: "Manning", email: "4996779@testmail.com", status: "ParticipantApplied" },
            { applicationId: 886193, firstName: "Alena", lastName: "Bailey", email: "4996846@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 886195, firstName: "Andrea", lastName: "Bowers", email: "4996849@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 886252, firstName: "Alicia", lastName: "Barrera", email: "4996943@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 886256, firstName: "Keely", lastName: "Ford", email: "4996948@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 886303, firstName: "Anna", lastName: "Hansen", email: "4997026@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 886448, firstName: "Anabel", lastName: "Boone", email: "4997214@testmail.com", status: "PreInterview" },
            { applicationId: 886451, firstName: "Amanda", lastName: "Black", email: "4997217@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 886477, firstName: "Shinae", lastName: "Reid", email: "4997246@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 886480, firstName: "Amelia", lastName: "Steele", email: "4997248@testmail.com", status: "ParticipantApplied" },
            { applicationId: 886562, firstName: "Alejandra", lastName: "Ayers", email: "4997351@testmail.com", status: "PreInterview" },
            { applicationId: 886563, firstName: "Myer", lastName: "Robb", email: "4997356@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 886574, firstName: "Kendra", lastName: "Taylor", email: "4997366@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 905044, firstName: "Grace", lastName: "Mcisaac", email: "4997374@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 886604, firstName: "Michaela", lastName: "Williams", email: "4997404@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 886642, firstName: "Maya", lastName: "Hegh", email: "4997465@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 886647, firstName: "Grace", lastName: "Hannon", email: "4997470@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 886648, firstName: "Sasha", lastName: "Cameron", email: "4997471@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 886652, firstName: "Faith", lastName: "Ball", email: "4997475@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 886663, firstName: "Derrick", lastName: "Bowman", email: "4997484@testmail.com", status: "PreInterview" },
            { applicationId: 886680, firstName: "Asha", lastName: "Robinson", email: "4997508@testmail.com", status: "ParticipantApplied" },
            { applicationId: 886712, firstName: "Hannah", lastName: "Lawn", email: "4997559@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 886726, firstName: "Frost", lastName: "Rowe", email: "4997577@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 886792, firstName: "Alta", lastName: "Bender", email: "4997677@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 886895, firstName: "Katie", lastName: "Mcivor", email: "4997855@testmail.com", status: "ParticipantApplied" },
            { applicationId: 886902, firstName: "Amy", lastName: "Mcnamara", email: "4997865@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 886985, firstName: "Amelia", lastName: "Blackwell", email: "4997993@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 887075, firstName: "Olivia", lastName: "Groube", email: "4998127@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 887077, firstName: "Anders", lastName: "Bradford", email: "4998132@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 887083, firstName: "Alena", lastName: "Bailey", email: "4998140@testmail.com", status: "AcceptedOnProgramme" },
            { applicationId: 887210, firstName: "Anthony", lastName: "Gower", email: "4998364@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 887217, firstName: "Aliza", lastName: "Bauer", email: "4998377@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 887255, firstName: "Demetrius", lastName: "Blankenship", email: "4998447@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 887265, firstName: "Ainsley", lastName: "Stace", email: "4998466@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 887271, firstName: "Jaxon", lastName: "Lintott", email: "4998471@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 887278, firstName: "India-Rose", lastName: "Stent", email: "4998479@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 887285, firstName: "John", lastName: "Mcleod", email: "4998488@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 887332, firstName: "Alison", lastName: "Bartlett", email: "4998579@testmail.com", status: "PreInterview" },
            { applicationId: 887351, firstName: "Courtney", lastName: "Tiffen", email: "4998601@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 887395, firstName: "Finn", lastName: "Cresswell", email: "4998679@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 889319, firstName: "Danelle", lastName: "Wolmarans", email: "4998770@testmail.com", status: "ParticipantApplied" },
            { applicationId: 887556, firstName: "Greer", lastName: "Wilson", email: "4998782@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 887475, firstName: "Delmar", lastName: "Aguirre", email: "4998786@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 887478, firstName: "Sarah", lastName: "Laban-Ten Dam", email: "4998789@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 887481, firstName: "Stevie", lastName: "Green", email: "4998793@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 887557, firstName: "Amelia", lastName: "Blackwell", email: "4998899@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 887573, firstName: "Rebecca", lastName: "Shallcrass", email: "4998925@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 887648, firstName: "Olivia", lastName: "Gainsford", email: "4999072@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 887654, firstName: "Luciano", lastName: "Parnell", email: "4999083@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 887702, firstName: "Darren", lastName: "Blevins", email: "4999174@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 887710, firstName: "Amie", lastName: "Blankenship", email: "4999188@testmail.com", status: "PreInterview" },
            { applicationId: 887712, firstName: "Kienan", lastName: "Smith", email: "4999192@testmail.com", status: "ParticipantApplied" },
            { applicationId: 887720, firstName: "Anabel", lastName: "Boone", email: "4999203@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 887721, firstName: "Alma", lastName: "Beasley", email: "4999204@testmail.com", status: "PreInterview" },
            { applicationId: 887733, firstName: "Alta", lastName: "Bender", email: "4999218@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 887763, firstName: "Alison", lastName: "Bartlett", email: "4999263@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 887803, firstName: "Ava", lastName: "Mcaulay", email: "4999328@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 887808, firstName: "Aisling", lastName: "Andrews", email: "4999333@testmail.com", status: "PreInterview" },
            { applicationId: 887809, firstName: "Ali", lastName: "Barlow", email: "4999334@testmail.com", status: "PreInterview" },
            { applicationId: 887880, firstName: "Piper", lastName: "Munro", email: "4999335@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 887814, firstName: "Rebecca", lastName: "Bradley", email: "4999341@testmail.com", status: "ParticipantApplied" },
            { applicationId: 887854, firstName: "Alena", lastName: "Bailey", email: "4999400@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 887856, firstName: "Georgia", lastName: "Packer", email: "4999402@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 887858, firstName: "Oliver", lastName: "Lewis", email: "4999406@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 887860, firstName: "Savannah", lastName: "Smith", email: "4999409@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 887866, firstName: "Kaitlyn", lastName: "Jolly", email: "4999413@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 887918, firstName: "Amira", lastName: "Bolton", email: "4999499@testmail.com", status: "PreInterview" },
            { applicationId: 887923, firstName: "Molly-Mae", lastName: "Walsh", email: "4999507@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 887941, firstName: "Alexandra", lastName: "Cunningham", email: "4999519@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 887932, firstName: "Laya", lastName: "Dickson", email: "4999522@testmail.com", status: "ParticipantApplied" },
            { applicationId: 887936, firstName: "Aliyah", lastName: "Battle", email: "4999528@testmail.com", status: "PreInterview" },
            { applicationId: 887971, firstName: "Alyce", lastName: "Bentley", email: "4999593@testmail.com", status: "PreInterview" },
            { applicationId: 887972, firstName: "Allison", lastName: "Beach", email: "4999597@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 887973, firstName: "Angelica", lastName: "Branch", email: "4999599@testmail.com", status: "PreInterview" },
            { applicationId: 888033, firstName: "Harrison", lastName: "Walker", email: "4999697@testmail.com", status: "ParticipantApplied" },
            { applicationId: 888034, firstName: "Almira", lastName: "Bell", email: "4999698@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 888044, firstName: "Alice", lastName: "Barr", email: "4999709@testmail.com", status: "PreInterview" },
            { applicationId: 888144, firstName: "Rebekah", lastName: "Cudby", email: "4999903@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 888156, firstName: "Freya", lastName: "Ginnever", email: "4999910@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 888162, firstName: "Del", lastName: "Barr", email: "4999928@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 888201, firstName: "Allie", lastName: "Baxter", email: "5000000@testmail.com", status: "PreInterview" },
            { applicationId: 888209, firstName: "Jessica", lastName: "Pitiroi", email: "5000010@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 888211, firstName: "Ruby", lastName: "Lennox", email: "5000012@testmail.com", status: "ParticipantApplied" },
            { applicationId: 888212, firstName: "Brydie", lastName: "Paterson", email: "5000014@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 888229, firstName: "Adella", lastName: "Aguilar", email: "5000027@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 890449, firstName: "Ana", lastName: "Booker", email: "5000196@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 888321, firstName: "Alysa", lastName: "Berg", email: "5000202@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 888331, firstName: "Aisha", lastName: "Pratt", email: "5000218@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 888378, firstName: "Casper", lastName: "Berg", email: "5000293@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 888396, firstName: "Aida", lastName: "Allison", email: "5000328@testmail.com", status: "AcceptedOnProgramme" },
            { applicationId: 888401, firstName: "Dillyn", lastName: "Moore-Shine", email: "5000343@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 888436, firstName: "Sydney", lastName: "Marsh", email: "5000409@testmail.com", status: "ParticipantApplied" },
            { applicationId: 888440, firstName: "Amalia", lastName: "Bishop", email: "5000419@testmail.com", status: "RejectedByOffice" },
            { applicationId: 888448, firstName: "Alyson", lastName: "Best", email: "5000427@testmail.com", status: "PreInterview" },
            { applicationId: 888452, firstName: "Agatha", lastName: "Alford", email: "5000432@testmail.com", status: "RejectedByOffice" },
            { applicationId: 888477, firstName: "Anastasia", lastName: "Bowen", email: "5000472@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 888649, firstName: "Tyra", lastName: "Ibbott", email: "5000474@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 888506, firstName: "Katie", lastName: "Jeremic", email: "5000557@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 888509, firstName: "Sarah", lastName: "Willers", email: "5000560@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 888555, firstName: "Alvina", lastName: "Benson", email: "5000641@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 888567, firstName: "Jasmine", lastName: "Roberts", email: "5000652@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 888571, firstName: "Ruby", lastName: "Valentine", email: "5000655@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 888573, firstName: "Molly", lastName: "Gibbons", email: "5000658@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 888582, firstName: "Adeline", lastName: "Adkins", email: "5000671@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 888583, firstName: "Akira", lastName: "Arnold", email: "5000673@testmail.com", status: "PreInterview" },
            { applicationId: 888634, firstName: "Denis", lastName: "Beach", email: "5000758@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 888635, firstName: "Almeta", lastName: "Becker", email: "5000759@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 888639, firstName: "Natalie", lastName: "Simkin", email: "5000765@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 888640, firstName: "America", lastName: "Blake", email: "5000766@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 888643, firstName: "Grace", lastName: "Hornsey", email: "5000770@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 888646, firstName: "Cody", lastName: "Thorne", email: "5000774@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 888648, firstName: "Jorja", lastName: "Hastings", email: "5000777@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 888691, firstName: "Aimee", lastName: "Alvarado", email: "5000857@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 888702, firstName: "Adelina", lastName: "Adams", email: "5000878@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 888711, firstName: "James", lastName: "Guzzwell", email: "5000890@testmail.com", status: "ParticipantApplied" },
            { applicationId: 888755, firstName: "Casper", lastName: "Bauer", email: "5000970@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 888762, firstName: "Angelia", lastName: "Brady", email: "5000982@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 888791, firstName: "Anna", lastName: "Comeskey", email: "5001033@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 888797, firstName: "Alba", lastName: "Atkinson", email: "5001040@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 888798, firstName: "Kaneisha", lastName: "Mckenzie-Williams", email: "5001043@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 888808, firstName: "Maisy", lastName: "Collins", email: "5001054@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 888813, firstName: "Amelia", lastName: "Blackwell", email: "5001059@testmail.com", status: "PreInterview" },
            { applicationId: 888814, firstName: "Akira", lastName: "Arnold", email: "5001060@testmail.com", status: "PreInterview" },
            { applicationId: 888818, firstName: "Aja", lastName: "Armstrong", email: "5001065@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 888834, firstName: "Angelia", lastName: "Brady", email: "5001085@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 888890, firstName: "Maggie Rose", lastName: "Shapland", email: "5001184@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 888893, firstName: "Alessandra", lastName: "Baird", email: "5001188@testmail.com", status: "PreInterview" },
            { applicationId: 888898, firstName: "Almira", lastName: "Bell", email: "5001198@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 888903, firstName: "Angelia", lastName: "Brady", email: "5001203@testmail.com", status: "PreInterview" },
            { applicationId: 888906, firstName: "Paige", lastName: "O’malley", email: "5001206@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 888979, firstName: "Lily", lastName: "Smith", email: "5001340@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 888985, firstName: "Ali", lastName: "Barlow", email: "5001346@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 888986, firstName: "Aimee", lastName: "Alvarado", email: "5001347@testmail.com", status: "PreInterview" },
            { applicationId: 889065, firstName: "Aileen", lastName: "Alston", email: "5001492@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 889094, firstName: "Alexandria", lastName: "Ballard", email: "5001529@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 889153, firstName: "Grace", lastName: "Davidson", email: "5001663@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 889155, firstName: "Ryan", lastName: "Jenkins", email: "5001666@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 889157, firstName: "Grayson", lastName: "Pullen-Burry", email: "5001667@testmail.com", status: "ParticipantApplied" },
            { applicationId: 889165, firstName: "Almeta", lastName: "Becker", email: "5001676@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 889179, firstName: "Almeta", lastName: "Becker", email: "5001691@testmail.com", status: "RejectedByOffice" },
            { applicationId: 889180, firstName: "Jonelle", lastName: "Wiki Arapeta", email: "5001693@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 889213, firstName: "Gemma", lastName: "Surry", email: "5001754@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 889230, firstName: "Chloe", lastName: "Farland", email: "5001786@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 889322, firstName: "America", lastName: "Blake", email: "5001954@testmail.com", status: "PreInterview" },
            { applicationId: 890355, firstName: "Keely", lastName: "Moir", email: "5001962@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 889482, firstName: "Angelia", lastName: "Brady", email: "5002272@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 889491, firstName: "Elanor", lastName: "Capel", email: "5002281@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 889494, firstName: "Amelia", lastName: "Blackwell", email: "5002284@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 889533, firstName: "Kaylah", lastName: "Campbell", email: "5002341@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 889544, firstName: "Aileen", lastName: "Alston", email: "5002362@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 889613, firstName: "Ally", lastName: "Bean", email: "5002494@testmail.com", status: "PreInterview" },
            { applicationId: 889657, firstName: "Zoe", lastName: "Newton", email: "5002578@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 889664, firstName: "Scarlett", lastName: "Miller", email: "5002587@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 889735, firstName: "Alva", lastName: "Bennett", email: "5002714@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 889787, firstName: "Ryleigh", lastName: "Cusack", email: "5002808@testmail.com", status: "ParticipantApplied" },
            { applicationId: 889791, firstName: "Matthew", lastName: "Ray", email: "5002814@testmail.com", status: "ParticipantApplied" },
            { applicationId: 889797, firstName: "Alfreda", lastName: "Barker", email: "5002817@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 889799, firstName: "Akiyo", lastName: "Ashley", email: "5002820@testmail.com", status: "PreInterview" },
            { applicationId: 889848, firstName: "Hannah", lastName: "Mead", email: "5002918@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 889854, firstName: "Alta", lastName: "Bender", email: "5002934@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 889879, firstName: "Alfreda", lastName: "Barker", email: "5002972@testmail.com", status: "PreInterview" },
            { applicationId: 889881, firstName: "Sophie", lastName: "Wullems", email: "5002975@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 889884, firstName: "Mia", lastName: "Douglas", email: "5002983@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 889896, firstName: "Izak", lastName: "Jackson", email: "5003013@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 889942, firstName: "Alfreda", lastName: "Barker", email: "5003096@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 889945, firstName: "Alvina", lastName: "Benson", email: "5003099@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 889948, firstName: "Aimee", lastName: "Alvarado", email: "5003105@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 889954, firstName: "Anastasia", lastName: "Bowen", email: "5003119@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 889967, firstName: "Aja", lastName: "Armstrong", email: "5003139@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 889968, firstName: "Aleah", lastName: "Avery", email: "5003140@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 889974, firstName: "Isabel", lastName: "Pudney", email: "5003147@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 889977, firstName: "Adella", lastName: "Aguilar", email: "5003149@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 889980, firstName: "Charlotte", lastName: "Macvicar", email: "5003154@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 889983, firstName: "Lily-Elise", lastName: "Beachen", email: "5003158@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 889989, firstName: "Samantha", lastName: "O'neill", email: "5003171@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 890195, firstName: "Bo", lastName: "Black", email: "5003172@testmail.com", status: "PreInterview" },
            { applicationId: 889994, firstName: "Alivia", lastName: "Bates", email: "5003181@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 890047, firstName: "Madeline", lastName: "Joyce", email: "5003270@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 890057, firstName: "Alberta", lastName: "Austin", email: "5003291@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 890058, firstName: "Scarlett", lastName: "Dickenson", email: "5003295@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 890060, firstName: "Agatha", lastName: "Alford", email: "5003297@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 890074, firstName: "William", lastName: "Mason", email: "5003317@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 890088, firstName: "Amina", lastName: "Blevins", email: "5003346@testmail.com", status: "PreInterview" },
            { applicationId: 890258, firstName: "Isla", lastName: "Mccarthy", email: "5003671@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 890347, firstName: "Amy", lastName: "Van Rooyen", email: "5003851@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 890366, firstName: "Adine", lastName: "Alexander", email: "5003875@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 890455, firstName: "Ryah", lastName: "Tui", email: "5004052@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 890458, firstName: "Matthew", lastName: "Love", email: "5004057@testmail.com", status: "ParticipantApplied" },
            { applicationId: 890463, firstName: "Zia", lastName: "Grobler", email: "5004065@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 890464, firstName: "Amparo", lastName: "Bond", email: "5004066@testmail.com", status: "RejectedByOffice" },
            { applicationId: 890465, firstName: "Trinity", lastName: "Mann", email: "5004067@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 890542, firstName: "Amelia", lastName: "Hornblow", email: "5004239@testmail.com", status: "ParticipantApplied" },
            { applicationId: 890550, firstName: "Alivia", lastName: "Bates", email: "5004254@testmail.com", status: "PreInterview" },
            { applicationId: 890590, firstName: "Mikayla", lastName: "Don", email: "5004355@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 890609, firstName: "Boston", lastName: "Wallace", email: "5004386@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 890613, firstName: "Max", lastName: "Currie", email: "5004391@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 890671, firstName: "Ruth", lastName: "Kayes", email: "5004503@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 890675, firstName: "Shelby", lastName: "De Greve", email: "5004509@testmail.com", status: "ParticipantApplied" },
            { applicationId: 890767, firstName: "Chip", lastName: "Acosta", email: "5004708@testmail.com", status: "PreInterview" },
            { applicationId: 890820, firstName: "Adella", lastName: "Aguilar", email: "5004800@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 890929, firstName: "Adelle", lastName: "Aguirre", email: "5005047@testmail.com", status: "PreInterview" },
            { applicationId: 891116, firstName: "Alfreda", lastName: "Barker", email: "5005359@testmail.com", status: "PreInterview" },
            { applicationId: 891138, firstName: "Allie", lastName: "Baxter", email: "5005402@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 891220, firstName: "Angeles", lastName: "Bradshaw", email: "5005572@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 891265, firstName: "Angelina", lastName: "Brandt", email: "5005662@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 891268, firstName: "Anders", lastName: "Barnett", email: "5005665@testmail.com", status: "PreInterview" },
            { applicationId: 891275, firstName: "Bethany", lastName: "Priday", email: "5005672@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 891276, firstName: "Aleia", lastName: "Hedges", email: "5005674@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 891278, firstName: "Joshua", lastName: "Mccaffery", email: "5005677@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 891431, firstName: "Maria", lastName: "Sanders", email: "5005788@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 891447, firstName: "Matthew", lastName: "Eagles", email: "5005791@testmail.com", status: "ParticipantApplied" },
            { applicationId: 891624, firstName: "Micaela", lastName: "Francis", email: "5005871@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 891635, firstName: "Jasmine", lastName: "Murray", email: "5005881@testmail.com", status: "ParticipantApplied" },
            { applicationId: 891644, firstName: "Jade", lastName: "Jarvie-Wells", email: "5005884@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 891652, firstName: "Daron", lastName: "Banks", email: "5005890@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 891663, firstName: "Adeline", lastName: "Adkins", email: "5005895@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 891719, firstName: "Amalia", lastName: "Bishop", email: "5005927@testmail.com", status: "RejectedByOffice" },
            { applicationId: 891828, firstName: "Ngahuia", lastName: "Riddell", email: "5006005@testmail.com", status: "ParticipantApplied" },
            { applicationId: 892046, firstName: "Dean", lastName: "Austin", email: "5006165@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 892049, firstName: "Amparo", lastName: "Bond", email: "5006167@testmail.com", status: "PreInterview" },
            { applicationId: 892064, firstName: "Gemma", lastName: "Eagles", email: "5006179@testmail.com", status: "ParticipantApplied" },
            { applicationId: 892200, firstName: "Collin", lastName: "Bond", email: "5006305@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 892347, firstName: "Alexia", lastName: "Oscroft", email: "5006308@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 892207, firstName: "Maya", lastName: "Sharp", email: "5006309@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 892210, firstName: "Kimberley", lastName: "Lyttle", email: "5006312@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 892212, firstName: "Ruby", lastName: "Darragh", email: "5006314@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 892352, firstName: "Aileen", lastName: "Alston", email: "5006433@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 892359, firstName: "Stella", lastName: "Higginson", email: "5006441@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 892361, firstName: "Oscar", lastName: "Laird", email: "5006442@testmail.com", status: "ParticipantApplied" },
            { applicationId: 892362, firstName: "Chloe", lastName: "Mugg", email: "5006443@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 892366, firstName: "Angelica", lastName: "Branch", email: "5006450@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 892383, firstName: "Alice", lastName: "Barr", email: "5006460@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 892466, firstName: "Carolina", lastName: "Flores", email: "5006529@testmail.com", status: "ParticipantApplied" },
            { applicationId: 892479, firstName: "Coeghan", lastName: "Van Lieshout", email: "5006536@testmail.com", status: "ParticipantApplied" },
            { applicationId: 892488, firstName: "Nicola", lastName: "Hunter", email: "5006548@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 892495, firstName: "Angel", lastName: "Bradford", email: "5006554@testmail.com", status: "PreInterview" },
            { applicationId: 892497, firstName: "Miselo", lastName: "Teu", email: "5006556@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 892503, firstName: "Rylee", lastName: "Cleine", email: "5006561@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 892519, firstName: "Alexandria", lastName: "Ballard", email: "5006575@testmail.com", status: "PreInterview" },
            { applicationId: 892610, firstName: "Grace", lastName: "Molotsky", email: "5006658@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 893269, firstName: "Summer", lastName: "Carson", email: "5007081@testmail.com", status: "ParticipantApplied" },
            { applicationId: 893276, firstName: "Otis", lastName: "Cloutman", email: "5007088@testmail.com", status: "ParticipantApplied" },
            { applicationId: 893369, firstName: "Thomas", lastName: "Oakley-Smith", email: "5007161@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 893371, firstName: "Jada", lastName: "Derksen", email: "5007163@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 893376, firstName: "Alysa", lastName: "Berg", email: "5007169@testmail.com", status: "AcceptedOnProgramme" },
            { applicationId: 893381, firstName: "Amelie", lastName: "Blair", email: "5007174@testmail.com", status: "PreInterview" },
            { applicationId: 893513, firstName: "Ada", lastName: "Abel", email: "5007296@testmail.com", status: "PreInterview" },
            { applicationId: 893610, firstName: "Kailey", lastName: "Sawyer", email: "5007381@testmail.com", status: "ParticipantApplied" },
            { applicationId: 893646, firstName: "Chloe", lastName: "Rutledge", email: "5007410@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 893649, firstName: "Katherine", lastName: "Watkin", email: "5007413@testmail.com", status: "ParticipantApplied" },
            { applicationId: 893650, firstName: "Alyson", lastName: "Best", email: "5007416@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 893651, firstName: "Casey", lastName: "Roessink", email: "5007418@testmail.com", status: "ParticipantApplied" },
            { applicationId: 901984, firstName: "Akiyo", lastName: "Ashley", email: "5007421@testmail.com", status: "PreInterview" },
            { applicationId: 893654, firstName: "Angel", lastName: "Bradford", email: "5007422@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 895055, firstName: "James", lastName: "Leen", email: "5007428@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 893754, firstName: "Samantha", lastName: "Clarke", email: "5007516@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 893781, firstName: "Amalia", lastName: "Bishop", email: "5007538@testmail.com", status: "PreInterview" },
            { applicationId: 893784, firstName: "Sofia", lastName: "Rush", email: "5007541@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 893785, firstName: "Aleah", lastName: "Avery", email: "5007543@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 893897, firstName: "Isla", lastName: "Radley", email: "5007635@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 893908, firstName: "Edward", lastName: "O'sullivan", email: "5007655@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 893927, firstName: "Grace", lastName: "Turnock", email: "5007680@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 893929, firstName: "Kadia", lastName: "Easton", email: "5007682@testmail.com", status: "ParticipantApplied" },
            { applicationId: 894168, firstName: "Molly", lastName: "Downing", email: "5007683@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 894024, firstName: "Ruby", lastName: "Cooper", email: "5007782@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 894674, firstName: "Joseph", lastName: "Morrow", email: "5007795@testmail.com", status: "ParticipantApplied" },
            { applicationId: 894172, firstName: "Madison", lastName: "Burrows", email: "5007932@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 894182, firstName: "Alba", lastName: "Atkinson", email: "5007941@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 894371, firstName: "Kate", lastName: "Gray", email: "5008106@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 894380, firstName: "Katie", lastName: "Doncliff", email: "5008113@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 894399, firstName: "Joshua", lastName: "Mcconnell", email: "5008130@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 894400, firstName: "Charlie", lastName: "Hofmeester", email: "5008132@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 894425, firstName: "Alexandra", lastName: "Ball", email: "5008149@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 894468, firstName: "Hazel", lastName: "Engert-Rodgers", email: "5008188@testmail.com", status: "ParticipantApplied" },
            { applicationId: 896598, firstName: "Charlotte", lastName: "O’hagan", email: "5008213@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 894564, firstName: "Riley", lastName: "Betman", email: "5008274@testmail.com", status: "ParticipantApplied" },
            { applicationId: 894580, firstName: "Ashley", lastName: "Andrews", email: "5008291@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 894693, firstName: "Jordan", lastName: "Davies", email: "5008376@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 894851, firstName: "Cristobal", lastName: "Bass", email: "5008505@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 894934, firstName: "Angelina", lastName: "Brandt", email: "5008584@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 894935, firstName: "Andrea", lastName: "Bowers", email: "5008587@testmail.com", status: "PreInterview" },
            { applicationId: 894939, firstName: "Caitlin", lastName: "Taylor", email: "5008589@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 895172, firstName: "Ally", lastName: "Bean", email: "5008799@testmail.com", status: "PreInterview" },
            { applicationId: 895254, firstName: "Angelia", lastName: "Brady", email: "5008881@testmail.com", status: "PreInterview" },
            { applicationId: 895360, firstName: "Demarcus", lastName: "Alvarado", email: "5008983@testmail.com", status: "PreInterview" },
            { applicationId: 895372, firstName: "Mackenzie", lastName: "Melville", email: "5008990@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 895460, firstName: "Leah", lastName: "Millar", email: "5009067@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 895466, firstName: "Amy", lastName: "Perry", email: "5009075@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 895467, firstName: "Joseph", lastName: "Miguel Brogan", email: "5009076@testmail.com", status: "ParticipantApplied" },
            { applicationId: 895561, firstName: "Alica", lastName: "Barnett", email: "5009143@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 895562, firstName: "Ethan", lastName: "Speers", email: "5009144@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 895668, firstName: "Kallan", lastName: "Moore", email: "5009234@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 895692, firstName: "Jesse", lastName: "Leen", email: "5009251@testmail.com", status: "ParticipantApplied" },
            { applicationId: 895796, firstName: "Angel", lastName: "Lane", email: "5009348@testmail.com", status: "ParticipantApplied" },
            { applicationId: 895802, firstName: "Hannah", lastName: "Forsyth", email: "5009350@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 895809, firstName: "Aileen", lastName: "Alston", email: "5009355@testmail.com", status: "PreInterview" },
            { applicationId: 895814, firstName: "Ali", lastName: "Barlow", email: "5009358@testmail.com", status: "PreInterview" },
            { applicationId: 895826, firstName: "Bianca", lastName: "Rees", email: "5009368@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 895923, firstName: "Maia", lastName: "Clunie", email: "5009450@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 895945, firstName: "Mariska", lastName: "Ludlow", email: "5009466@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 895947, firstName: "Ella", lastName: "Willcox", email: "5009468@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 896050, firstName: "Coco", lastName: "Cassels", email: "5009558@testmail.com", status: "ParticipantApplied" },
            { applicationId: 896072, firstName: "Ruby", lastName: "Jennings", email: "5009576@testmail.com", status: "ParticipantOutOfProgrammeFAI" },
            { applicationId: 896073, firstName: "Alice", lastName: "Barr", email: "5009577@testmail.com", status: "PreInterview" },
            { applicationId: 896076, firstName: "Aleah", lastName: "Avery", email: "5009578@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 896609, firstName: "Alberta", lastName: "Austin", email: "5009689@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 896276, firstName: "Agnes", lastName: "Allen", email: "5009762@testmail.com", status: "PreInterview" },
            { applicationId: 896988, firstName: "Coby", lastName: "Mcquoid", email: "5009775@testmail.com", status: "ParticipantApplied" },
            { applicationId: 896291, firstName: "Emma", lastName: "Hart", email: "5009776@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 896297, firstName: "Cole", lastName: "Taylor", email: "5009782@testmail.com", status: "ParticipantApplied" },
            { applicationId: 896379, firstName: "Damian", lastName: "Berger", email: "5009853@testmail.com", status: "PreInterview" },
            { applicationId: 896474, firstName: "Louisa", lastName: "Clifford", email: "5009936@testmail.com", status: "ParticipantApplied" },
            { applicationId: 896494, firstName: "Lily", lastName: "Porter", email: "5009951@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 896839, firstName: "Elizabeth", lastName: "Harrison", email: "5010045@testmail.com", status: "ParticipantApplied" },
            { applicationId: 896611, firstName: "Alejandra", lastName: "Ayers", email: "5010046@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 896614, firstName: "Akira", lastName: "Arnold", email: "5010048@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 896617, firstName: "Daron", lastName: "Bonner", email: "5010051@testmail.com", status: "PreInterview" },
            { applicationId: 896870, firstName: "Alysa", lastName: "Berg", email: "5010289@testmail.com", status: "PreInterview" },
            { applicationId: 896965, firstName: "Andrzej", lastName: "Beach", email: "5010387@testmail.com", status: "PreInterview" },
            { applicationId: 897209, firstName: "Daron", lastName: "Baker", email: "5010618@testmail.com", status: "PostInterview" },
            { applicationId: 897310, firstName: "Amina", lastName: "Blevins", email: "5010723@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 897311, firstName: "Enya", lastName: "Booth", email: "5010724@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 897346, firstName: "Alexandra", lastName: "Fenwick", email: "5010761@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 897418, firstName: "Andrew", lastName: "Boyd", email: "5010831@testmail.com", status: "PreInterview" },
            { applicationId: 897433, firstName: "Deon", lastName: "Barnett", email: "5010845@testmail.com", status: "PreInterview" },
            { applicationId: 897443, firstName: "Hunter", lastName: "Shepherd", email: "5010854@testmail.com", status: "ParticipantApplied" },
            { applicationId: 897453, firstName: "Isabella", lastName: "Harneiss", email: "5010862@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 897581, firstName: "Hayley", lastName: "Giddens", email: "5010971@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 897583, firstName: "Lucy", lastName: "Eastergaard", email: "5010972@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 897592, firstName: "Alexander", lastName: "Sim", email: "5010984@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 897600, firstName: "Rylan", lastName: "Richardson", email: "5011000@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 897624, firstName: "Damien", lastName: "Paewai", email: "5011029@testmail.com", status: "ParticipantApplied" },
            { applicationId: 897785, firstName: "Aisha", lastName: "Anderson", email: "5011112@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 897792, firstName: "Angelia", lastName: "Brady", email: "5011116@testmail.com", status: "RejectedByOffice" },
            { applicationId: 897821, firstName: "Alena", lastName: "Bailey", email: "5011133@testmail.com", status: "RejectedByOffice" },
            { applicationId: 897831, firstName: "Adella", lastName: "Aguilar", email: "5011142@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 897922, firstName: "Kyle", lastName: "Taylor", email: "5011218@testmail.com", status: "ParticipantApplied" },
            { applicationId: 898264, firstName: "Aimee", lastName: "Alvarado", email: "5011496@testmail.com", status: "RejectedByOffice" },
            { applicationId: 898369, firstName: "Thomas", lastName: "Foy", email: "5011610@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 898397, firstName: "Aimee", lastName: "Alvarado", email: "5011640@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 898398, firstName: "Matthew", lastName: "Debreceny", email: "5011641@testmail.com", status: "ParticipantApplied" },
            { applicationId: 898534, firstName: "Mackenzie", lastName: "Jordan", email: "5011643@testmail.com", status: "ParticipantApplied" },
            { applicationId: 898406, firstName: "Summer", lastName: "Cavander", email: "5011648@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 898605, firstName: "Samuel", lastName: "Reid", email: "5011811@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 899067, firstName: "Sydney", lastName: "Tagg", email: "5011915@testmail.com", status: "ParticipantApplied" },
            { applicationId: 898747, firstName: "Sarah", lastName: "Beck", email: "5011924@testmail.com", status: "ParticipantApplied" },
            { applicationId: 898765, firstName: "Alissa", lastName: "Barton", email: "5011940@testmail.com", status: "PreInterview" },
            { applicationId: 910319, firstName: "Emma", lastName: "Orr", email: "5012142@testmail.com", status: "ParticipantApplied" },
            { applicationId: 898984, firstName: "Hannah", lastName: "Withington", email: "5012147@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 898988, firstName: "Rachel", lastName: "Hewett", email: "5012148@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 899048, firstName: "Chance", lastName: "Avery", email: "5012200@testmail.com", status: "PreInterview" },
            { applicationId: 899065, firstName: "Sarah", lastName: "Lawrence", email: "5012217@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 899348, firstName: "Analisa", lastName: "Booth", email: "5012478@testmail.com", status: "PreInterview" },
            { applicationId: 899371, firstName: "Amira", lastName: "Bolton", email: "5012502@testmail.com", status: "PreInterview" },
            { applicationId: 899510, firstName: "Paige", lastName: "Gawn", email: "5012621@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 899526, firstName: "Georgia", lastName: "Devlin", email: "5012634@testmail.com", status: "ParticipantApplied" },
            { applicationId: 899547, firstName: "Denny", lastName: "Bell", email: "5012654@testmail.com", status: "Returner" },
            { applicationId: 899678, firstName: "Troy", lastName: "Waldon", email: "5012784@testmail.com", status: "ParticipantApplied" },
            { applicationId: 899696, firstName: "Isobelle", lastName: "Allnatt", email: "5012802@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 899698, firstName: "Alise", lastName: "Allnatt", email: "5012803@testmail.com", status: "ParticipantApplied" },
            { applicationId: 899707, firstName: "Grace", lastName: "Jones", email: "5012814@testmail.com", status: "ParticipantApplied" },
            { applicationId: 899720, firstName: "Derrick", lastName: "Bass", email: "5012832@testmail.com", status: "PreInterview" },
            { applicationId: 899837, firstName: "Isabella", lastName: "Harvey", email: "5012934@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 900104, firstName: "Andrew", lastName: "Boyd", email: "5013163@testmail.com", status: "PreInterview" },
            { applicationId: 900234, firstName: "Ashley", lastName: "Flanagan", email: "5013306@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 900244, firstName: "Georgia", lastName: "Morris", email: "5013312@testmail.com", status: "ParticipantApplied" },
            { applicationId: 900259, firstName: "Alyssa", lastName: "Bird", email: "5013328@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 900367, firstName: "Katie", lastName: "Kemp", email: "5013420@testmail.com", status: "ParticipantApplied" },
            { applicationId: 900413, firstName: "Alexandra", lastName: "Ball", email: "5013469@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 900416, firstName: "Angeles", lastName: "Bradshaw", email: "5013471@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 900420, firstName: "Jayda", lastName: "Chiverton", email: "5013475@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 900425, firstName: "Alana", lastName: "Atkins", email: "5013482@testmail.com", status: "PreInterview" },
            { applicationId: 900439, firstName: "Amina", lastName: "Blevins", email: "5013492@testmail.com", status: "PreInterview" },
            { applicationId: 900597, firstName: "Grace", lastName: "Hardcastle", email: "5013642@testmail.com", status: "ParticipantApplied" },
            { applicationId: 900752, firstName: "Anika", lastName: "Bagrie", email: "5013772@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 900764, firstName: "Malia", lastName: "Dungey", email: "5013783@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 901316, firstName: "Aimee", lastName: "Hammond", email: "5014249@testmail.com", status: "ParticipantApplied" },
            { applicationId: 901417, firstName: "Adella", lastName: "Aguilar", email: "5014327@testmail.com", status: "PreInterview" },
            { applicationId: 901423, firstName: "Tegan", lastName: "Souness", email: "5014331@testmail.com", status: "ParticipantApplied" },
            { applicationId: 901596, firstName: "Allison", lastName: "Beach", email: "5014490@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 901728, firstName: "Amber", lastName: "Blackburn", email: "5014628@testmail.com", status: "AcceptedOnProgramme" },
            { applicationId: 901793, firstName: "Alissa", lastName: "Barton", email: "5014679@testmail.com", status: "PreInterview" },
            { applicationId: 902344, firstName: "Makayla", lastName: "Reilly", email: "5015136@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 902356, firstName: "Georgia", lastName: "Scott", email: "5015146@testmail.com", status: "ParticipantApplied" },
            { applicationId: 902362, firstName: "Amy", lastName: "Bonner", email: "5015152@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 902372, firstName: "Angelica", lastName: "Branch", email: "5015162@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 902481, firstName: "Cesar", lastName: "Alston", email: "5015253@testmail.com", status: "PreInterview" },
            { applicationId: 904716, firstName: "Angela", lastName: "Bradley", email: "5015264@testmail.com", status: "PreInterview" },
            { applicationId: 902607, firstName: "Darnell", lastName: "Bowen", email: "5015364@testmail.com", status: "PreInterview" },
            { applicationId: 902609, firstName: "Alyssa", lastName: "Bird", email: "5015365@testmail.com", status: "PreInterview" },
            { applicationId: 902610, firstName: "August", lastName: "Bender", email: "5015367@testmail.com", status: "PreInterview" },
            { applicationId: 902614, firstName: "Olivia", lastName: "Swann", email: "5015370@testmail.com", status: "ParticipantApplied" },
            { applicationId: 902638, firstName: "Sophie Maree", lastName: "Teh-Hall", email: "5015385@testmail.com", status: "ParticipantApplied" },
            { applicationId: 902797, firstName: "Alejandra", lastName: "Ayers", email: "5015504@testmail.com", status: "PostInterview" },
            { applicationId: 902807, firstName: "Alma", lastName: "Beasley", email: "5015510@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 902808, firstName: "Ava", lastName: "Antonopoulos", email: "5015511@testmail.com", status: "ParticipantApplied" },
            { applicationId: 903566, firstName: "Amparo", lastName: "Bond", email: "5015751@testmail.com", status: "RejectedByOffice" },
            { applicationId: 903096, firstName: "Aleah", lastName: "Avery", email: "5015755@testmail.com", status: "RejectedByOffice" },
            { applicationId: 903098, firstName: "Adina", lastName: "Albert", email: "5015757@testmail.com", status: "PreInterview" },
            { applicationId: 903099, firstName: "Samuel", lastName: "Burt", email: "5015758@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 903102, firstName: "Aimee", lastName: "Thorpe", email: "5015760@testmail.com", status: "ParticipantApplied" },
            { applicationId: 903448, firstName: "Mackenzie", lastName: "Mackereth", email: "5016042@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 903451, firstName: "Ruby", lastName: "Godden", email: "5016047@testmail.com", status: "ParticipantApplied" },
            { applicationId: 903456, firstName: "Amanda", lastName: "Black", email: "5016051@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 903461, firstName: "Jenny", lastName: "Mcmillan", email: "5016054@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 903564, firstName: "Colt", lastName: "Bell", email: "5016148@testmail.com", status: "PreInterview" },
            { applicationId: 903702, firstName: "Adine", lastName: "Alexander", email: "5016265@testmail.com", status: "PreInterview" },
            { applicationId: 903729, firstName: "Melissa", lastName: "Ward", email: "5016287@testmail.com", status: "ParticipantApplied" },
            { applicationId: 903878, firstName: "Darrick", lastName: "Abbott", email: "5016418@testmail.com", status: "PreInterview" },
            { applicationId: 903907, firstName: "Cassidy", lastName: "Crawford", email: "5016442@testmail.com", status: "ParticipantReadyToPlace" },
            { applicationId: 904063, firstName: "Stacey", lastName: "Mullin", email: "5016447@testmail.com", status: "ParticipantApplied" },
            { applicationId: 904891, firstName: "Alva", lastName: "Bennett", email: "5016450@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 904058, firstName: "Aisling", lastName: "Andrews", email: "5016582@testmail.com", status: "PreInterview" },
            { applicationId: 904069, firstName: "Brendan", lastName: "Acfield", email: "5016595@testmail.com", status: "ParticipantApplied" },
            { applicationId: 904090, firstName: "Aja", lastName: "Armstrong", email: "5016611@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 904228, firstName: "Alannah", lastName: "Rennie", email: "5016725@testmail.com", status: "ParticipantApplied" },
            { applicationId: 904438, firstName: "Reef", lastName: "Townsend", email: "5016927@testmail.com", status: "ParticipantApplied" },
            { applicationId: 904555, firstName: "Anders", lastName: "Benton", email: "5017041@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 904565, firstName: "Brooke", lastName: "Van Kampen", email: "5017052@testmail.com", status: "ParticipantApplied" },
            { applicationId: 904730, firstName: "Clement", lastName: "Bowman", email: "5017205@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 904738, firstName: "Ainsley", lastName: "Alvarez", email: "5017214@testmail.com", status: "RejectedByOffice" },
            { applicationId: 904741, firstName: "Alysa", lastName: "Berg", email: "5017221@testmail.com", status: "PreInterview" },
            { applicationId: 904751, firstName: "Amy", lastName: "Bonner", email: "5017235@testmail.com", status: "PreInterview" },
            { applicationId: 904754, firstName: "Adine", lastName: "Alexander", email: "5017238@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 904914, firstName: "Allie", lastName: "Baxter", email: "5017414@testmail.com", status: "RejectedByOffice" },
            { applicationId: 905045, firstName: "Riley", lastName: "Currie", email: "5017539@testmail.com", status: "ParticipantApplied" },
            { applicationId: 905053, firstName: "Ben", lastName: "Cherry", email: "5017554@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 905081, firstName: "Tiana", lastName: "Purdon", email: "5017578@testmail.com", status: "ParticipantApplied" },
            { applicationId: 905334, firstName: "Almira", lastName: "Bell", email: "5017816@testmail.com", status: "PreInterview" },
            { applicationId: 905541, firstName: "Alina", lastName: "Barrett", email: "5018043@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 905682, firstName: "Emma", lastName: "Morris", email: "5018187@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 905851, firstName: "Adelle", lastName: "Aguirre", email: "5018347@testmail.com", status: "RejectedByOffice" },
            { applicationId: 905864, firstName: "Analisa", lastName: "Booth", email: "5018361@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 905869, firstName: "Craig", lastName: "Bernard", email: "5018365@testmail.com", status: "PreInterview" },
            { applicationId: 906008, firstName: "Alivia", lastName: "Bates", email: "5018487@testmail.com", status: "PreInterview" },
            { applicationId: 906016, firstName: "Ami", lastName: "Blanchard", email: "5018495@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 906024, firstName: "Alysha", lastName: "Bernard", email: "5018501@testmail.com", status: "PreInterview" },
            { applicationId: 906030, firstName: "Chico", lastName: "Ballard", email: "5018509@testmail.com", status: "PostInterview" },
            { applicationId: 906037, firstName: "Aisha", lastName: "Anderson", email: "5018517@testmail.com", status: "PreInterview" },
            { applicationId: 906133, firstName: "August", lastName: "Barrera", email: "5018594@testmail.com", status: "PreInterview" },
            { applicationId: 906135, firstName: "Alma", lastName: "Beasley", email: "5018596@testmail.com", status: "PreInterview" },
            { applicationId: 906140, firstName: "Lavinia-Rose", lastName: "Humphreys", email: "5018600@testmail.com", status: "ParticipantApplied" },
            { applicationId: 906167, firstName: "Almira", lastName: "Bell", email: "5018626@testmail.com", status: "PreInterview" },
            { applicationId: 906265, firstName: "Monique", lastName: "Brooks", email: "5018719@testmail.com", status: "ParticipantApplied" },
            { applicationId: 906283, firstName: "Emily", lastName: "Thompson", email: "5018735@testmail.com", status: "ParticipantApplied" },
            { applicationId: 906474, firstName: "Elli", lastName: "Gentles", email: "5018928@testmail.com", status: "ParticipantApplied" },
            { applicationId: 906484, firstName: "Alba", lastName: "Atkinson", email: "5018936@testmail.com", status: "PreInterview" },
            { applicationId: 906487, firstName: "Maddison", lastName: "Maffey", email: "5018941@testmail.com", status: "ParticipantApplied" },
            { applicationId: 906652, firstName: "Alysa", lastName: "Berg", email: "5019079@testmail.com", status: "PostInterview" },
            { applicationId: 906802, firstName: "Agatha", lastName: "Alford", email: "5019196@testmail.com", status: "PreInterview" },
            { applicationId: 906970, firstName: "Connor", lastName: "Te Rito", email: "5019370@testmail.com", status: "ParticipantApplied" },
            { applicationId: 906974, firstName: "Olive", lastName: "Mortimer", email: "5019376@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 906987, firstName: "Denver", lastName: "Bell", email: "5019392@testmail.com", status: "PostInterview" },
            { applicationId: 907159, firstName: "Pippa", lastName: "Jackson", email: "5019523@testmail.com", status: "ParticipantApplied" },
            { applicationId: 907155, firstName: "Alisa", lastName: "Barron", email: "5019551@testmail.com", status: "PreInterview" },
            { applicationId: 907264, firstName: "Brieanna", lastName: "Mercer", email: "5019661@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 907406, firstName: "Alyse", lastName: "Berger", email: "5019798@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 907410, firstName: "Hayden", lastName: "Wafer", email: "5019801@testmail.com", status: "ParticipantApplied" },
            { applicationId: 907482, firstName: "Alissa", lastName: "Barton", email: "5019869@testmail.com", status: "PostInterview" },
            { applicationId: 907517, firstName: "Allyson", lastName: "Beard", email: "5019903@testmail.com", status: "PreInterview" },
            { applicationId: 907524, firstName: "Coco", lastName: "Mauger", email: "5019908@testmail.com", status: "ParticipantPlaced" },
            { applicationId: 907865, firstName: "Connor", lastName: "Mckay", email: "5020216@testmail.com", status: "ParticipantApplied" },
            { applicationId: 907868, firstName: "Amie", lastName: "Blankenship", email: "5020218@testmail.com", status: "RejectedByOffice" },
            { applicationId: 907877, firstName: "Amanda", lastName: "Black", email: "5020225@testmail.com", status: "PreInterview" },
            { applicationId: 908078, firstName: "Carmelo", lastName: "Allen", email: "5020412@testmail.com", status: "PreInterview" },
            { applicationId: 908082, firstName: "Amber", lastName: "Blackburn", email: "5020418@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 908487, firstName: "Alvina", lastName: "Benson", email: "5020823@testmail.com", status: "PreInterview" },
            { applicationId: 908497, firstName: "Alysa", lastName: "Berg", email: "5020834@testmail.com", status: "PreInterview" },
            { applicationId: 908663, firstName: "Cooper", lastName: "Hardy", email: "5020996@testmail.com", status: "ParticipantApplied" },
            { applicationId: 908679, firstName: "Cletus", lastName: "Blake", email: "5021012@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 908680, firstName: "Molly-Jo", lastName: "Coutts", email: "5021015@testmail.com", status: "ParticipantApplied" },
            { applicationId: 908817, firstName: "Alexia", lastName: "Banks", email: "5021152@testmail.com", status: "PostInterview" },
            { applicationId: 908831, firstName: "Imogen", lastName: "Mehrtens-Poole", email: "5021165@testmail.com", status: "ParticipantApplied" },
            { applicationId: 908845, firstName: "Jamie", lastName: "Parsons", email: "5021180@testmail.com", status: "ParticipantApplied" },
            { applicationId: 908875, firstName: "Amelie", lastName: "Blair", email: "5021214@testmail.com", status: "PreInterview" },
            { applicationId: 908997, firstName: "Amber", lastName: "Blackburn", email: "5021332@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 909149, firstName: "Angelia", lastName: "Brady", email: "5021457@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 909171, firstName: "James", lastName: "Ganley", email: "5021483@testmail.com", status: "ParticipantApplied" },
            { applicationId: 909175, firstName: "Adela", lastName: "Abrams", email: "5021487@testmail.com", status: "PreInterview" },
            { applicationId: 909301, firstName: "Aisling", lastName: "Andrews", email: "5021607@testmail.com", status: "PreInterview" },
            { applicationId: 909302, firstName: "Alyson", lastName: "Best", email: "5021609@testmail.com", status: "PreInterview" },
            { applicationId: 909515, firstName: "Jackson", lastName: "Siave", email: "5021815@testmail.com", status: "ParticipantApplied" },
            { applicationId: 909523, firstName: "Alana", lastName: "Atkins", email: "5021825@testmail.com", status: "PreInterview" },
            { applicationId: 909585, firstName: "Aislinn", lastName: "Anthony", email: "5021891@testmail.com", status: "PreInterview" },
            { applicationId: 909635, firstName: "Adelia", lastName: "Acosta", email: "5021946@testmail.com", status: "PreInterview" },
            { applicationId: 909773, firstName: "Ali", lastName: "Barlow", email: "5022082@testmail.com", status: "PreInterview" },
            { applicationId: 909805, firstName: "Alena", lastName: "Bailey", email: "5022112@testmail.com", status: "PreInterview" },
            { applicationId: 909930, firstName: "Adelina", lastName: "Adams", email: "5022237@testmail.com", status: "RejectedByOffice" },
            { applicationId: 910016, firstName: "Daryl", lastName: "Bishop", email: "5022311@testmail.com", status: "PreInterview" },
            { applicationId: 910054, firstName: "Sylvie", lastName: "Speden", email: "5022346@testmail.com", status: "ParticipantApplied" },
            { applicationId: 910083, firstName: "Alma", lastName: "Beasley", email: "5022375@testmail.com", status: "PreInterview" },
            { applicationId: 910264, firstName: "Anastasia", lastName: "Bowen", email: "5022553@testmail.com", status: "PreInterview" },
            { applicationId: 910332, firstName: "Chas", lastName: "Alston", email: "5022629@testmail.com", status: "PreInterview" },
            { applicationId: 910344, firstName: "Dean", lastName: "Arnold", email: "5022640@testmail.com", status: "PreInterview" },
            { applicationId: 910432, firstName: "Arnold", lastName: "Barker", email: "5022740@testmail.com", status: "PreInterview" },
            { applicationId: 910435, firstName: "Ally", lastName: "Bean", email: "5022743@testmail.com", status: "PreInterview" },
            { applicationId: 910436, firstName: "Jasmin", lastName: "Smith", email: "5022744@testmail.com", status: "ParticipantApplied" },
            { applicationId: 910562, firstName: "Amelia", lastName: "Blackwell", email: "5022891@testmail.com", status: "PreInterview" },
            { applicationId: 910563, firstName: "Cletus", lastName: "Aguilar", email: "5022893@testmail.com", status: "PreInterview" },
            { applicationId: 910564, firstName: "Alicia", lastName: "Barrera", email: "5022894@testmail.com", status: "PreInterview" },
            { applicationId: 910565, firstName: "Adeline", lastName: "Adkins", email: "5022895@testmail.com", status: "PreInterview" },
            { applicationId: 910582, firstName: "Ana", lastName: "Booker", email: "5022919@testmail.com", status: "PostInterview" },
            { applicationId: 910700, firstName: "Analisa", lastName: "Booth", email: "5023036@testmail.com", status: "PreInterview" },
            { applicationId: 910727, firstName: "Andy", lastName: "Boyer", email: "5023056@testmail.com", status: "PreInterview" },
            { applicationId: 910735, firstName: "Mikako", lastName: "Hutton", email: "5023062@testmail.com", status: "ParticipantApplied" },
            { applicationId: 910881, firstName: "Alyson", lastName: "Best", email: "5023209@testmail.com", status: "PreInterview" },
            { applicationId: 910903, firstName: "Chance", lastName: "Bradshaw", email: "5023233@testmail.com", status: "PreInterview" },
            { applicationId: 911047, firstName: "Agatha", lastName: "Alford", email: "5023355@testmail.com", status: "PostInterview" },
            { applicationId: 911064, firstName: "Alyson", lastName: "Best", email: "5023370@testmail.com", status: "PreInterview" },
            { applicationId: 911070, firstName: "America", lastName: "Blake", email: "5023375@testmail.com", status: "PreInterview" },
            { applicationId: 911173, firstName: "Aja", lastName: "Armstrong", email: "5023376@testmail.com", status: "PreInterview" },
            { applicationId: 911241, firstName: "Natalee", lastName: "Hepburn", email: "5023535@testmail.com", status: "ParticipantOutOfProgrammeCNX" },
            { applicationId: 911248, firstName: "Darrick", lastName: "Berger", email: "5023543@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 911345, firstName: "Darnell", lastName: "Bowen", email: "5023640@testmail.com", status: "PreInterview" },
            { applicationId: 911432, firstName: "Alex", lastName: "Baker", email: "5023730@testmail.com", status: "PreInterview" },
            { applicationId: 911542, firstName: "Alba", lastName: "Atkinson", email: "5023839@testmail.com", status: "PostInterview" },
            { applicationId: 912550, firstName: "Alina", lastName: "Barrett", email: "5023965@testmail.com", status: "PreInterview" },
            { applicationId: 911672, firstName: "Alica", lastName: "Barnett", email: "5023976@testmail.com", status: "PreInterview" },
            { applicationId: 911675, firstName: "Aliyah", lastName: "Battle", email: "5023979@testmail.com", status: "PreInterview" },
            { applicationId: 911701, firstName: "Alyse", lastName: "Berger", email: "5024004@testmail.com", status: "PostInterview" },
            { applicationId: 911839, firstName: "Akira", lastName: "Arnold", email: "5024142@testmail.com", status: "PreInterview" },
            { applicationId: 911845, firstName: "Althea", lastName: "Benjamin", email: "5024149@testmail.com", status: "PreInterview" },
            { applicationId: 912102, firstName: "Chandler", lastName: "Alexander", email: "5024403@testmail.com", status: "PreInterview" },
            { applicationId: 912107, firstName: "Chance", lastName: "Bean", email: "5024409@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 912399, firstName: "Bogdan", lastName: "Aguirre", email: "5024412@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 912128, firstName: "Caio", lastName: "Anthony", email: "5024432@testmail.com", status: "PreInterview" },
            { applicationId: 912207, firstName: "Arnold", lastName: "Bradford", email: "5024513@testmail.com", status: "RejectedByInterviewer" },
            { applicationId: 912323, firstName: "Amalia", lastName: "Bishop", email: "5024642@testmail.com", status: "PreInterview" },
            { applicationId: 912403, firstName: "Andrea", lastName: "Bowers", email: "5024727@testmail.com", status: "PreInterview" },
            { applicationId: 912416, firstName: "Clint", lastName: "Bean", email: "5024738@testmail.com", status: "PreInterview" },
            { applicationId: 912436, firstName: "Alana", lastName: "Atkins", email: "5024762@testmail.com", status: "PreInterview" },
            { applicationId: 912556, firstName: "Anette", lastName: "Boyle", email: "5024885@testmail.com", status: "PreInterview" },
            { applicationId: 912572, firstName: "Andres", lastName: "Bowman", email: "5024901@testmail.com", status: "PreInterview" },
            { applicationId: 912573, firstName: "Alissa", lastName: "Barton", email: "5024902@testmail.com", status: "PreInterview" },
            { applicationId: 912574, firstName: "Alina", lastName: "Barrett", email: "5024903@testmail.com", status: "PreInterview" },
            { applicationId: 912585, firstName: "Amalia", lastName: "Bishop", email: "5024914@testmail.com", status: "PreInterview" },
            { applicationId: 912801, firstName: "Alberta", lastName: "Austin", email: "5025134@testmail.com", status: "PreInterview" },
            { applicationId: 912810, firstName: "Alva", lastName: "Bennett", email: "5025142@testmail.com", status: "PreInterview" },
            { applicationId: 912839, firstName: "Aislinn", lastName: "Anthony", email: "5025165@testmail.com", status: "PreInterview" },
            { applicationId: 912838, firstName: "Bruno", lastName: "Benjamin", email: "5025172@testmail.com", status: "PreInterview" },
            { applicationId: 912852, firstName: "n", lastName: "z", email: "nz@example.com", status: "PreInterview" },
            { applicationId: 912853, firstName: "n", lastName: "za", email: "nza@example.com", status: "PreInterview" },
            { applicationId: 912866, firstName: "Jen", lastName: "A", email: "Jen@example.com", status: "PreInterview" },
            { applicationId: 912867, firstName: "Test", lastName: "Photo", email: "test@photo.com", status: "ParticipantApplied" },
            { applicationId: 912873, firstName: "Phiona", lastName: "Photo", email: "test@photo2.com", status: "PreInterview" },
            { applicationId: 912885, firstName: "Photo", lastName: "Test", email: "test@photoa.com", status: "PreInterview" },
            { applicationId: 912891, firstName: "Nisa", lastName: "Paul", email: "Nisa@example.com", status: "PreInterview" },
            { applicationId: 912894, firstName: "Joseph", lastName: "Paul", email: "Joseph@example.com", status: "PreInterview" },
            { applicationId: 912896, firstName: "Anni", lastName: "Paul", email: "Anni@example.com", status: "PreInterview" },
            { applicationId: 912901, firstName: "t3", lastName: "t3", email: "t4@example.com", status: "PreInterview" },
            { applicationId: 912902, firstName: "t5", lastName: "t5", email: "t5@example.com", status: "PreInterview" },
            { applicationId: 912903, firstName: "t6", lastName: "t6", email: "t6@example.com", status: "PreInterview" },
            { applicationId: 912904, firstName: "t7", lastName: "t7", email: "t7@example.com", status: "PreInterview" },
            { applicationId: 912912, firstName: "Ethan", lastName: "A", email: "Ethan@example.com", status: "PreInterview" },
            { applicationId: 912913, firstName: "Taylor", lastName: "P", email: "Taylor@example.com", status: "PreInterview" },
            { applicationId: 912914, firstName: "Denise", lastName: "L", email: "Denise@example.com", status: "PreInterview" },
            { applicationId: 912917, firstName: "Gabi", lastName: "B", email: "Gabi@example.com", status: "PreInterview" },
            { applicationId: 912919, firstName: "Photo1", lastName: "Test", email: "photo1@test.com", status: "PreInterview" },
            { applicationId: 912922, firstName: "Ella", lastName: "A", email: "Ella@example.com", status: "PreInterview" },
            { applicationId: 912925, firstName: "Photo33", lastName: "Test", email: "photo33@test.com", status: "PreInterview" },
            { applicationId: 912931, firstName: "Photo22", lastName: "Test", email: "photo22@test.com", status: "PreInterview" },
        ];

        var columns: CfTableColumn[] = [
            new CfTableColumn("First", CfTableColumnAlignment.Left, CfTableColumnType.String),
            new CfTableColumn("Last", CfTableColumnAlignment.Left, CfTableColumnType.String),
            new CfTableColumn("Email", CfTableColumnAlignment.Left, CfTableColumnType.String),
            new CfTableColumn("Status", CfTableColumnAlignment.Left, CfTableColumnType.UserStatus),
        ];
        this.typeaheadSearchTable = new CfTableData(columns, []);
    }

    doTypeaheadLookup(value: string): void {
        const searchTerm = value.toLocaleLowerCase();

        this.typeaheadSearchTable!.rows = [];
        this.typeaheadHasResults = false;
        this.isTypeaheadSearching = true;

        setTimeout( () => {
            this.typeaheadSearchResults = this.typeaheadSearchData
                .filter((d: TypeaheadResults) => {
                    return d.firstName.toLocaleLowerCase().includes(searchTerm)
                        || d.lastName.toLocaleLowerCase().includes(searchTerm)
                        || d.email.toLocaleLowerCase().includes(searchTerm)
                });

            if(this.typeaheadSearchResults.length > 0) {
                const results = this.typeaheadSearchResults.map( (v: TypeaheadResults) => {
                    return new CfTableRow(`${v.applicationId}`, [v.firstName, v.lastName, v.email, v.status]);
                });
                // console.log(`RESULTS: ${JSON.stringify(results)}`);

                this.typeaheadSearchTable!.rows = results.slice(0,10);
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
            this.selectedCardCount = !this.selectedCardCount;
            const url = (this.selectedCardCount)
                ? 'https://campamericalive.s3.amazonaws.com/resources/2023/893825/I/893825-80249724-8bea-43f0-b84c-745434346baf'
                : 'https://campamericalive.s3.amazonaws.com/resources/2022/815074/I/815074-75d4cb74-23d9-4974-988f-35d60a3f2c8c';

//            console.log(`URL: ${url}`);
            this.selectedApplicant = undefined;

            setTimeout(()=>{
                this.typeahead.closeResults();
                this.typeaheadRecordSelected = true;
                this.selectedApplicant = {
                    applicationId: applicant.applicationId,
                    profileUrl: url,
                    firstName: applicant.firstName,
                    lastName: applicant.lastName,
                    status: applicant.status
                };
            }, 150);
        }
    }

    applicantCardSelected(applicationId: number): void {
        window.alert(`Selected Card id #${applicationId}`);
    }

    observableData$ = new Observable<CFMention>();
    testText = '';
    setMentionText(): void {
        const t = 'Hello, this is some default text, written by <span spellcheck="false" class="mention">@Ian Seckington</span> for the attention of <span spellcheck="false" class="mention">@Michael Tolfrey</span>.<br>';
        const parts = t.split('<');

        parts.forEach( p => {
            if(p.startsWith('span spellcheck="false" class="mention">@')) {
                if(p.length > 22) {
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
                { type: CFDropdownItemType.ImageAndText, text: 'Image and text item', link: 'second', imageClass: 'fa-regular fa-envelope' },
                { type: CFDropdownItemType.ImageAndText, text: 'Image and text (Disabled)', link: 'third', imageClass: 'fa-regular fa-padlock', disabled: true },
            ]
        }
    }

    onDropdownSelected(item: CFDropdownItem): void {
        window.alert(`Item selected: ${item.link}`);
    }

    // Menu
    menuItem = '';
    prepareMenu(): void {

    }

    menuItemSelected(link: string): void {
        this.menuItem = link;
    }

    inTour = false;
    tourItems: CFTourElement[] = [];
    restoreX = 0;
    restoreY = 0;
    startTour(): void {
        console.log(`Start tour`);

        const items: CFTourElement[] = [];
        items.push(new CFTourElement("CL:menu", "This is the menu, click here for more functionality.<br><br>The logo will always return you to the home page.", "Main Menu"));
        items.push(new CFTourElement("CL:div.spinner img.lg", "This is the loader control, used while network operations are in effect.", "Activity Indicator"));
        items.push(new CFTourElement("CL:applicant-card", "This is an example of an applicant card.<br><br>These contain at-a-glance information regarding the applicant.", "Applicant Card"));
        
        this.tourItems = items;
        this.restoreX = window.scrollX;
        this.restoreY = window.scrollY;
        this.inTour = true;
    }

    // changeTourItem(direction: number): void {
    //     console.log(`Move ${direction > 0 ? 'forwards' : 'backwards'} through tour`);
    //     this.inTour = false;
    //     this.currentItem += direction;
    //     this.tourItem = this.getTourItem(this.tourItems[this.currentItem], this.currentItem);
    //     this.inTour = (this.tourItem != undefined);
    // }

    // getTourItem(className: string, index: number): CFTourItem | undefined {
    //     let ti = undefined;
    //     const b = this.uiservice.getElementPositionByClass(className);
    //     if (b) {
    //         console.log(`Bounds: ${JSON.stringify(b)}, window: ${window.scrollX},${window.scrollY}`);
    //         const x = b[0].x;
    //         console.log(`Looking at x: ${x}`);
    //         switch(className) {
    //             case 'menu':
    //                 ti = new CFTourItem(
    //                     "This is the menu, click here for more functionality.<br><br>The logo will always return you to the home page.", 
    //                     x, b[0].y + window.scrollY, 
    //                     b[0].width, b[0].height, 
    //                     'The Main Menu', 0, 3);
    //                 break;
    //             case 'applicant-card':
    //                 ti = new CFTourItem(
    //                     "This is an example of an applicant card.<br><br>These contain at-a-glance information regarding the applicant.",
    //                     x, b[0].y + window.scrollY, 
    //                     b[0].width, b[0].height, 
    //                     'Applicant Cards', index, 3);
    //                 break;
    //             case 'div.spinner img.lg':
    //                 ti = new CFTourItem(
    //                     "This is the loader control, used while network operations are in effect.",
    //                     x, b[0].y + window.scrollY,
    //                     b[0].width, b[0].height,
    //                     'Loader/Spinner', index, 3);
    //                 break;                    
    //         }
    //     } else {
    //         console.log(`Didn't get tour item: ${className}`);
    //     }
    //     return ti;
    // }

    endTour(end: boolean): void {
        console.log(`End tour!`);
        this.inTour = false;
        window.scrollTo({ left: this.restoreX, top: this.restoreY, behavior: 'smooth' })
    }

    standardTable?: CfTableData;
    paginationTable?: CfTableData;
    sortTable?: CfTableData;

    typeaheadSearchData: TypeaheadResults[] = [];
    typeaheadSearchResults: TypeaheadResults[] = [];
    typeaheadSearchTable?: CfTableData;
    displayApplicantCard?: ICfApplicantCardInfo;
    selectedApplicant?: ICfApplicantCardInfo;
}

export class TypeaheadResults {
    applicationId: number;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    constructor(id: number, f: string, l: string, e: string, s: string) {
        this.applicationId = id;
        this.firstName = f;
        this.lastName = l;
        this.email = e;
        this.status = s;
    }
}
