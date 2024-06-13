import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ICFUser } from '../cf-user-profile-stack/cf-user-profile-stack.component';

@Component({
    selector: 'app-cf-text-review',
    templateUrl: './cf-text-review.component.html',
    styleUrls: ['./cf-text-review.component.scss'],
})
export class CfTextReviewComponent implements OnInit, OnChanges {
    @Input() reviewItem!: CFTextReviewItem;
    @Input() readOnly = false;
    @Output() statusChanged: EventEmitter<CFTextReviewItem> = new EventEmitter();

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    changeStatus(event: Event): void {
        if (this.readOnly) return;

        switch (this.reviewItem.status) {
            case CFTextReviewStatus.None:
                this.reviewItem.status = CFTextReviewStatus.User;
                break;
            case CFTextReviewStatus.User:
                this.reviewItem.status = CFTextReviewStatus.SafeGuard;
                break;
            case CFTextReviewStatus.SafeGuard:
                this.reviewItem.status = CFTextReviewStatus.None;
                break;
        }

        this.statusChanged.emit(this.reviewItem);

        event.stopImmediatePropagation();
    }
}

export interface ICFTextReviewItem {
    status: CFTextReviewStatus;     // status for display
    dataItem: string;               // may need to be bigger
    text: string;                   // actual text - need a heading?
    reviewingUsers: ICFUser[];      // history
}

export enum CFTextReviewStatus {
    None = '',
    User = 'todo',
    SafeGuard = 'warn'
}

export class CFTextReviewItem implements ICFTextReviewItem {
    dataItem: string;
    text: string;
    status: CFTextReviewStatus = CFTextReviewStatus.None;
    reviewingUsers: ICFUser[] = [];
    constructor(data: string, text: string, status?: CFTextReviewStatus, users?: ICFUser[]) {
        this.dataItem = data;
        this.text = text;
        this.status = status ?? CFTextReviewStatus.None;
        this.reviewingUsers = users ?? [];
    }
}