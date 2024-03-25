import { FormControl, FormGroup } from '@angular/forms';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-cf-typeahead',
  templateUrl: './cf-typeahead.component.html',
  styleUrls: ['./cf-typeahead.component.scss']
})
export class CfTypeaheadComponent implements OnInit {
    @Input() placeholderTextDefault = "Search";
    @Input() placeholderTextActive = "Enter value";
    @Input() isSearching = false;
    @Input() hasResults = false;
    @Output() lookup: EventEmitter<string> = new EventEmitter<string>();

    formGroup!: FormGroup;
    isActive = false;
    placeholderText = '';
     
    searchText = '';
    currentSearchResultsForText: string = '';

    @ViewChild('searchInput', { static: true }) searchInput: ElementRef | undefined;

    constructor(){
        this.formGroup = new FormGroup({ search: new FormControl() });        
    }
    
    ngOnInit(): void {
        this.placeholderText = this.placeholderTextDefault;

        if (this.searchInput) {
            fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
                map((event: any) => {
                    if (event.target.value) return event.target.value.trim();
                }), 
                filter(res => res && res.length > 2), 
                debounceTime(250), 
                distinctUntilChanged(),
            ).subscribe((text: string) => {
                this.searchText = text;
                this.doSearch(this.searchText.trim());
            });        
        }
    }

    overlayClicked() {
        this.closeResults();
    }

    onClicked(event: Event): void {}

    onGotFocus(event: FocusEvent): void {
        this.isActive = true;
        this.placeholderText = this.placeholderTextActive;
    }

    onLostFocus(event: FocusEvent): void {
        // NOTE(IAN): we probably want to keep the results
        // box open if there are any results returned
        if(!this.hasResults) {
            this.isActive = false;
            this.placeholderText = this.placeholderTextDefault;
        }
    }

    closeResults(): void {
        if (this.isActive) {
            this.isActive = false;
            this.placeholderText = "Search";
        }
    }

    submit(): void {
        const control = this.formGroup.get('search');

        if (control && control.value) {
            const value = control.value.trim();

            this.doSearch(value);
        }
    }

    // May need to return an observable from here
    // or perhaps from the event we call out to
    doSearch(value: string): void {
        // console.log(`Search for: ${value}`);
        if (this.currentSearchResultsForText === value) {
            // console.log(`Already searched for: ${value}`);
        } else {
            this.currentSearchResultsForText = value;
            this.lookup.emit(value);
        }
    }
}