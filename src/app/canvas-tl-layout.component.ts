import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DateTime, Interval } from 'luxon';

@Component({
    templateUrl: './canvas-tl-layout.component.html',
    styleUrls: ['./canvas-tl-layout.component.scss']
})
export class CanvasLayoutComponent implements OnInit, AfterViewInit {
    constructor() {
    }

    ngOnInit(): void {
        console.log(`Today: ${this.today}`);
        this.populateTimeline();

        // 1. Find earliest start and latest end dates
        this.calculateTimelineRange();

        // 2. Calculate entries
        this.calculateEntries();

        // 3. Perhaps calculate some extra information
        // regarding year changes?
    }

    ngAfterViewInit(): void {

    }

    menuItemSelected(link: string): void {
        console.log(`Selected: ${link}`);
    }

    calculateEntries(): void {
        this.zindex = 0;

        const seen = new Set<number>();

        this.entriesPerMonth.forEach((value: TimelineEntry[], key: number) => {
            //console.log(key, `${JSON.stringify(value)}`);
            value.forEach(e => {
                if (!seen.has(e.id)) {
                    seen.add(e.id);
                    const htmlContent = `<p class='title'>${e.title}</p><p class='description'>${e.description}</p>`

                    const insert = (e.type == 1)
                        ? this.leftEntry(key, 0, e.duration, htmlContent)
                        : this.rightEntry(key, 0, e.duration, htmlContent);

                    this.entries.push(insert);
                }
            })
        });
    }

    entriesPerMonth = new Map<number, TimelineEntry[]>();

    calculateTimelineRange(): void {
        let start = DateTime.fromISO('2999-12-31');
        let end = DateTime.fromISO('1000-01-01');

        this.timeline.forEach(tl => {
            if (tl.startDate < start) {
                start = tl.startDate;
            }
            if (tl.endDate > end) {
                end = tl.endDate;
            }
        });

        console.log(`Earliest to latest: ${start}-${end}`);
        this.from = start;
        this.to = end;

        //const diff = end.diff(start, 'months');
        const i = Interval.fromDateTimes(start, end);
        this.months = +i.length('months') + 1;
        console.log(`Diff: ${this.months}`);
        this.entriesPerMonth.clear();


        for (let i = 0; i < this.months; i++) {
            const date = start.plus({ 'months': i });
            let combined = '';
            //console.log(`Date: ${date.toISODate()}`);
            const entries = this.timeline.filter(tle => date >= tle.startDate && date <= tle.endDate);
            if (entries) {
                const tl: TimelineEntry[] = entries;
                this.entriesPerMonth.set(i, tl);
            }

        }

    }

    populateTimeline() {
        // If still 'current', set endDate to this.today
        this.timeline = [];
        this.timeline.push(new TimelineEntry(1, 1, '2010-01', '2011-06', 'My Entry', 'My description'));
        this.timeline.push(new TimelineEntry(2, 1, '2011-07', '2012-11', 'A Second Entry', 'Another entry\'s description'));
        this.timeline.push(new TimelineEntry(3, 1, '2013-10', '2013-12', 'A Third Entry', 'Another entry\'s description'));
        this.timeline.push(new TimelineEntry(4, 2, '2010-12', '2012-06', 'A Work Entry', 'Another entry\'s description'));
        this.timeline.push(new TimelineEntry(5, 2, '2012-08', '2013-06', 'A Work Entry', 'Another entry\'s description'));
    }

    zindex = 0;

    leftEntry(top: number, side: number, height: number, text: string): TimlineHtmlEntry {
        const n = new TimlineHtmlEntry();

        n.type = 1;
        n.top = top;
        n.side = side;
        n.height = height;
        n.zIndex = this.zindex++;
        n.text = text;

        return n;
    }

    rightEntry(top: number, side: number, height: number, text: string): TimlineHtmlEntry {
        const n = new TimlineHtmlEntry();

        n.type = 2;
        n.top = top;
        n.side = side;
        n.height = height;
        n.zIndex = this.zindex++;
        n.text = text;

        return n;
    }

    getStyle(e: TimlineHtmlEntry): string {
        return e.style(this.TIMELINE_PADDING, this.TIMELINE_UNIT);
    }

    timeline: TimelineEntry[] = [];
    today = DateTime.now().toFormat('yyyy-MM');
    from: DateTime = DateTime.now();
    to: DateTime = DateTime.now();
    months = 0;

    entries: TimlineHtmlEntry[] = [];

    TIMELINE_PADDING = 0.5;
    TIMELINE_UNIT = 'rem';
}

export class TimlineHtmlEntry {
    type: number = 1;
    top: number = 0.5;
    side: number = -1;
    height: number = 1;
    zIndex: number = 0;

    style(padding: number, unit: string): string {
        const sideName = (this.type == 1) ? 'left' : 'right';
        const align = (this.type == 2) ? 'left' : 'right';
        let calcHeight = this.height+padding;
        return `text-align:${align};${sideName}:${this.side + padding}${unit};top:${this.top}${unit};height:${calcHeight}${unit};z-index:${this.zIndex}`;
    }

    text = '';
}

export class TimelineEntry {
    type = 1;                   // 1 - education, 2 - work
    startDate: DateTime;        // YYYYMM? have as number instead?
    endDate: DateTime;          // may be empty? or set to 'today' or 999912 by the server?
    title: string;
    description: string;
    id: number;
    duration = 0;
    constructor(id: number, type: number, startDate: string, endDate: string, title: string, description: string) {
        this.id = id;
        this.type = type;
        this.startDate = DateTime.fromISO(startDate);
        this.endDate = DateTime.fromISO(endDate);
        this.title = title;
        this.description = description;

        this.calculateDuration();
    }

    calculateDuration(): void {
        const i = Interval.fromDateTimes(this.startDate, this.endDate);
        this.duration = +i.length('months');
        if (this.duration < 2) this.duration = 2;
        //        console.log(`${this.id}: ${this.startDate.toISODate()} - ${this.endDate.toISODate()} -> duration: ${this.duration}`);
    }
}