import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DateTime, Interval } from 'luxon';
import { CfTabComponent, ICFTab } from './ui/cf-tab/cf-tab.component';
import { CFAlertType } from './ui/cf-alert/cf-alert.component';

@Component({
    templateUrl: './canvas-tl-layout.component.html',
    styleUrls: ['./canvas-tl-layout.component.scss']
})
export class CanvasLayoutComponent implements OnInit, AfterViewInit {
    @ViewChild('tabComponent', { static: false }) tabBar!: CfTabComponent;
    Alert = CFAlertType;

    constructor() {
    }

    ngOnInit(): void {
        //console.log(`Today: ${this.today}`);
        this.prepareTabs();
        this.populateTimeline();
        this.performTimelineLogic();
        this.performGapCheckLogic();
    }

    ngAfterViewInit(): void {

    }

    menuItemSelected(link: string): void {
        console.log(`Selected: ${link}`);
    }

    // MARK: Start of Timeline

    performTimelineLogic(): void {

        // 1. Find earliest start and latest end dates
        this.calculateTimelineRange();

        // 2. Calculate entries
        this.calculateEntries();

        // 3. Perhaps calculate some extra information
        // regarding year changes?
    }

    calculateEntries(): void {
        this.zindex = 0;

        const seen = new Set<number>();
        const l = new Map<number, number>();
        const r = new Map<number, number>();

        this.entriesPerMonth.forEach((value: TimelineEntry[], key: number) => {
            // console.log(key, `${JSON.stringify(value.length)}`);
            let leftCount = 0;
            let rightCount = 0;
            value.forEach(e => {
                // Is there an overlap?
                if (e.type == 1) {
                    let current = l.get(key);
                    if (current) current++; else current = 1;
                    l.set(key, current);
                } else {
                    let current = r.get(key);
                    if (current) current++; else current = 1;
                    r.set(key, current);
                }

                if (!seen.has(e.id)) {
                    seen.add(e.id);
                    let count = 0;
                    if (e.type == 1) count = l.get(key) ?? 0; else count = r.get(key) ?? 0;

                    let htmlContent = ``;
                    const time = `${e.startDate.toFormat('LLL yyyy')} - ${e.endDate.toFormat('LLL yyyy')}`

                    if (e.duration > 5) {
                        htmlContent = `<span class='title'>${e.title}</span><span class='date'>${time}</span><span class='description'>${e.description}</span>`
                    } else {
                        htmlContent = `<span class='title'>${e.title}</span><span class='compressed'>${time}</span>`;
                    }
                    const insert = (e.type == 1)
                        ? this.leftEntry(key, 0, e.duration, htmlContent, count)
                        : this.rightEntry(key, 0, e.duration, htmlContent, count);

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

        //console.log(`Earliest to latest: ${start}-${end}`);
        this.from = start;
        this.to = end;

        //const diff = end.diff(start, 'months');
        const i = Interval.fromDateTimes(start, end);
        this.months = +i.length('months') + 1 + this.TIMELINE_PADDING;
        //console.log(`Diff: ${this.months}`);
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

    zindex = 0;

    leftEntry(top: number, side: number, height: number, text: string, sideCount: number): TimlineHtmlEntry {
        const n = new TimlineHtmlEntry();

        n.type = 1;
        n.top = top;
        n.side = side;
        n.height = height;
        n.zIndex = this.zindex++;
        n.text = text;
        n.count = sideCount;

        return n;
    }

    rightEntry(top: number, side: number, height: number, text: string, sideCount: number): TimlineHtmlEntry {
        const n = new TimlineHtmlEntry();

        n.type = 2;
        n.top = top;
        n.side = side;
        n.height = height;
        n.zIndex = this.zindex++;
        n.text = text;
        n.count = sideCount;

        return n;
    }

    getStyle(e: TimlineHtmlEntry): string {
        return e.style(this.TIMELINE_PADDING, this.TIMELINE_UNIT);
    }

    getTickStyle(e: TimlineHtmlEntry): string {
        return e.tickStyle(this.TIMELINE_PADDING, this.TIMELINE_UNIT);
    }

    entries: TimlineHtmlEntry[] = [];

    TIMELINE_PADDING = 0.5;
    TIMELINE_UNIT = 'rem';

    // MARK: End of Timeline

    // MARK: Start of gap checking

    performGapCheckLogic(): void {
        // 1. Find earliest start and latest end dates
        this.calculateTimelineRange();

        // 2. Analyse the timeline and find any
        // notable gaps
        this.findGaps();
    }

    findGaps(): void {
        let biggestGap = 0;
        let gapFound = false;
        let startGapIndex = -1;
        let endGapIndex = -1;

        const seen = new Set<number>();

        this.entriesPerMonth.forEach((value: TimelineEntry[], key: number) => {
            //console.log(key, `${JSON.stringify(value.length)}`);
            if (value.length == 0) {
                if (!gapFound) {
                    startGapIndex = key;
                    gapFound = true;
                }
                biggestGap++;
                endGapIndex = key;
            } else {
                if (gapFound) {
                    gapFound = false;
                    const tlg = new TimelineGap(startGapIndex, endGapIndex, biggestGap);
                    this.gaps.push(tlg);
                    if (biggestGap >= this.GAP_THRESHOLD_MONTHS) {
                        this.gapDisplay.push(new GapEntry(1, this.getGapWarningHtml(tlg)));
                    }
                }
                value.forEach(e => {
                    // Is it the first occurence?
                    if (!seen.has(e.id)) {
                        seen.add(e.id);
                        this.gapDisplay.push(new GapEntry(0, this.getTimelineEntry(e)));
                    }
                });

            }
        });

        this.gaps.forEach(g => {
            console.warn(`We found a gap of ${g.gapLength} between indices ${g.startIndex} and ${g.endIndex}!`);
        });
    }

    getTimelineEntry(e: TimelineEntry): string {
        const start = e.startDate.toFormat('LLLL yyyy');
        const end = e.endDate ? e.endDate.toFormat('LLLL yyyy') : 'Present';
        const time = `${start} - ${end}`;

        const type = e.type == 1 ? `<i class="fa-solid fa-graduation-cap"></i>` : `<i class="fa-regular fa-building"></i>`;

        return `<p class='title'>${type}${e.title}</p><p class='date'>${time}</p><p class='description'>${e.description}</p>`;
    }

    getGapWarningHtml(gap: TimelineGap): string {
        return `There was a gap exceeding the threshold of ${this.GAP_THRESHOLD_MONTHS} months or more between the previous and next entry!`;
    }

    gaps: TimelineGap[] = [];
    gapDisplay: GapEntry[] = [];

    GAP_THRESHOLD_MONTHS = 4;

    // MARK: End of gap checking

    // MARK: Tab handling

    activeTabContent = 'gap';
    tabs: ICFTab[] = [];
    prepareTabs(): void {
        this.tabs = [
            { id: 'tl', title: 'Timeline', disabled: false },
            { id: 'gap', title: 'Gap Analysis', disabled: false },
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

    // MARK: End of Tab handling

    populateTimeline() {
        // If still 'current', set endDate to this.today
        this.timeline = [];
        this.timeline.push(new TimelineEntry(1, 1, '2010-09', '2012-07', 'Oakfield Primary School', 'My description'));
        this.timeline.push(new TimelineEntry(2, 1, '2012-09', '2014-07', 'Trevelyan Secondary Modern', 'Another entry\'s description'));
        this.timeline.push(new TimelineEntry(3, 1, '2014-09', '2015-07', 'Windsor Boys\' School', 'Another entry\'s description'));
        this.timeline.push(new TimelineEntry(4, 2, '2010-12', '2012-06', 'A Work Entry', 'Another entry\'s description'));
        this.timeline.push(new TimelineEntry(5, 2, '2012-01', '2013-06', 'Another Workplace', 'Another entry\'s description'));
        this.timeline.push(new TimelineEntry(6, 2, '2016-01', '2016-12', 'Yet Another Workplace', 'Another entry\'s description'));
    }

    timeline: TimelineEntry[] = [];
    today = DateTime.now().toFormat('yyyy-MM');
    from: DateTime = DateTime.now();
    to: DateTime = DateTime.now();
    months = 0;
}

export class TimlineHtmlEntry {
    type: number = 1;
    top: number = 0.5;
    side: number = -1;
    height: number = 1;
    zIndex: number = 0;
    count: number = 0;

    style(padding: number, unit: string): string {
        const sideName = (this.type == 1) ? 'left' : 'right';
        const align = (this.type == 2) ? 'left' : 'right';
        let calcHeight = this.height + padding;
        return `width:${49 - this.count * 1.5}%;text-align:${align};${sideName}:${this.side + padding}${unit};top:${this.top + padding}${unit};height:${calcHeight}${unit};z-index:${this.zIndex}`;
    }

    tickStyle(padding: number, unit: string): string {
        const align = (this.type == 2) ? 'left' : 'right';
        let calcHeight = this.height + padding;
        return `text-align:center;left:0rem;top:${this.top + padding}${unit};height:${calcHeight}${unit};z-index:${this.zIndex}`;
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

export class TimelineGap {
    startIndex = -1;
    endIndex = -1;
    gapLength = 0;
    constructor(start: number, end: number, length: number) {
        this.startIndex = start;
        this.endIndex = end;
        this.gapLength = length;
    }
}

export class GapEntry {
    type = 0;
    html = '';
    constructor(type: number, html: string) {
        this.type = type;
        this.html = html;
    }
}