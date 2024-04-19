import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-cf-tab',
    templateUrl: './cf-tab.component.html',
    styleUrls: ['./cf-tab.component.scss']
})
export class CfTabComponent implements OnInit, OnChanges {
    @Input() tabs: ICFTab[] = [];
    @Output() tabSelected: EventEmitter<string> = new EventEmitter();

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["tabs"]) {
            if (this.tabs.length > 0) {
                this.selectTab(this.tabs[0]);
            }
        }
    }

    selectTab(tab: ICFTab): void {
        if (tab.disabled) return;

        this.activeTab = tab.id;

        // Emit event
        this.tabSelected.emit(tab.id);
    }

    disableTab(id: string): void {
        const t = this.tabs.find(t => t.id === id);
        if (t) t.disabled = true;
        else console.warn(`Couldn't find tab by id ${id}`);
    }

    enableTab(id: string): void {
        const t = this.tabs.find(t => t.id === id);
        if (t) t.disabled = false;
        else console.warn(`Couldn't find tab by id ${id}`);
    }

    activeTab = '';
}
export interface ICFTab {
    title: string;
    id: string;
    disabled: boolean;
}