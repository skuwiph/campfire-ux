import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-cf-tab',
    templateUrl: './cf-tab.component.html',
    styleUrls: ['./cf-tab.component.scss']
})
export class CfTabComponent implements OnInit {
    @Output() tabSelected: EventEmitter<string> = new EventEmitter();


    tabs: ICFTab[] = [
        { id: 'one', title: 'Tab One', disabled: false },
        { id: 'two', title: 'Tab Two', disabled: false },
        { id: 'three', title: 'Tab Three', disabled: true },
    ];

    ngOnInit(): void {

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

    activeTab = 'one';
}
export interface ICFTab {
    title: string;
    id: string;
    disabled: boolean;
}