import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CFDropdownItem, CFDropdownItemType, CFDropdownOptions } from '../cf-dropdown/cf-dropdown.component';
import { TypeaheadResults } from 'src/app/control-summary.component';
import { CFTableColumn, CfTableColumnAlignment, CfTableColumnType, CFTableData, CFTableRow, CfTableSelectedRow } from '../cf-table/cf-table.component';
import { CfTypeaheadComponent } from '../cf-typeahead/cf-typeahead.component';

@Component({
  selector: 'app-cf-menu',
  templateUrl: './cf-menu.component.html',
  styleUrls: ['./cf-menu.component.scss']
})
export class CfMenuComponent implements OnInit {
    @Output() menuSelected: EventEmitter<string> = new EventEmitter();
    @ViewChild('typeahead', { static: false }) typeahead!: CfTypeaheadComponent;

    ngOnInit(): void {
        this.loadTypeaheadSearch(); 
        this.applicantOptions = {
            text: 'Applicants', showIndicator: false };
        this.interviewerOptions = {
            text: 'Interviewers', showIndicator: true, items: [
                { type: CFDropdownItemType.ImageAndText, text: 'Interviewers', link: 'interviewer', imageClass: 'fa-solid fa-people-group' },
                { type: CFDropdownItemType.ImageAndText, text: 'Summary', link: 'interviewer/summary', imageClass: 'fa-solid fa-list-check' },
            ]
        };
        this.dropdownOptions = {
            text: '', imageClass: 'fa-solid fa-user-gear', showIndicator: true, items: [
                { type: CFDropdownItemType.ImageAndText, text: 'Users', link: 'maintain/user', imageClass: 'fa-solid fa-circle-user' },
                { type: CFDropdownItemType.Separator },
                { type: CFDropdownItemType.ImageAndText, text: 'Countries', link: 'maintain/country', imageClass: 'fa-solid fa-book-atlas' },
                { type: CFDropdownItemType.ImageAndText, text: 'Flights', link: 'maintain/flight', imageClass: 'fa-solid fa-plane', disabled: true },
            ]
        };
        this.userOptions = {
            imageClass: 'fa-solid fa-circle-user',
            showIndicator: false,
            leftMargin: '-11.35rem',
            items: [
                { type: CFDropdownItemType.ImageAndText, text: 'Profile', link: 'profile', imageClass: 'fa-solid fa-id-card' },
                { type: CFDropdownItemType.Separator },
                { type: CFDropdownItemType.ImageAndText, text: 'Messages', link: 'messages', imageClass: 'fa-regular fa-envelope' },
                { type: CFDropdownItemType.Separator },
                { type: CFDropdownItemType.ImageAndText, text: 'Sign out', link: 'sign-out', imageClass: 'fa-solid fa-right-from-bracket' },
            ]
        };
    }

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
            { applicationId: 912925, firstName: "Photo33", lastName: "Test", email: "photo33@test.com", status: "PreInterview" },
            { applicationId: 912931, firstName: "Photo22", lastName: "Test", email: "photo22@test.com", status: "PreInterview" },
        ];

        var columns: CFTableColumn[] = [
            new CFTableColumn("Name", CfTableColumnAlignment.Left, CfTableColumnType.String),
            new CFTableColumn("Email", CfTableColumnAlignment.Left, CfTableColumnType.String),
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
                    return new CFTableRow(`${v.applicationId}`, [`${v.firstName} ${v.lastName}`, v.email]);
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
            this.selectedCardCount = !this.selectedCardCount;
            const url = (this.selectedCardCount)
                ? 'https://campamericalive.s3.amazonaws.com/resources/2023/893825/I/893825-80249724-8bea-43f0-b84c-745434346baf'
                : 'https://campamericalive.s3.amazonaws.com/resources/2022/815074/I/815074-75d4cb74-23d9-4974-988f-35d60a3f2c8c';

            //            console.log(`URL: ${url}`);
            //this.selectedApplicant = undefined;

            setTimeout(() => {
                this.typeahead.closeResults();
                this.typeaheadRecordSelected = true;
                // this.selectedApplicant = {
                //     applicationId: applicant.applicationId,
                //     profileUrl: url,
                //     firstName: applicant.firstName,
                //     lastName: applicant.lastName,
                //     status: applicant.status
                // };
            }, 150);
        }
    }

    itemSelected(link: string): void {
        this.menuSelected.emit(link);
    }

    dropdownSelected(item: CFDropdownItem): void {
        this.menuSelected.emit(item.link);
    }

    applicantOptions?: CFDropdownOptions;
    interviewerOptions?: CFDropdownOptions;
    dropdownOptions?: CFDropdownOptions;
    userOptions?: CFDropdownOptions;

    typeaheadSearchData: TypeaheadResults[] = [];
    typeaheadSearchResults: TypeaheadResults[] = [];
    typeaheadSearchTable?: CFTableData;
    isTypeaheadSearching = false;
    typeaheadHasResults = false;
    typeaheadRecordSelected = false;

}

