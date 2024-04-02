import { ChangeDetectorRef, Component, ElementRef, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-cf-mention-text',
  templateUrl: './cf-mention-text.component.html',
  styleUrls: ['./cf-mention-text.component.scss']
})
export class CfMentionTextComponent implements OnInit {
    model = '';
    dom = '';
    @ViewChild('mentiontext') textarea!: ElementRef;

    constructor(
        private cdr: ChangeDetectorRef,
        private sanitiser: DomSanitizer ){}

    ngOnInit(): void {
        this.temp = [
            { name: "alanger", fullName: "Allen Langer" },
            { name: "bbieniek", fullName: "Baltazar Bieniek" },
            { name: "cfletcher", fullName: "Charlotte Fletcher"},
            { name: "dwierzbicki", fullName: "Dawid Wierzbicki" },
            { name: "iseckington", fullName: "Ian Seckington" },
            { name: "jcook", fullName: "Jason Cook" },
            { name: "kmcsweeney", fullName: "Kerry McSweeney" },
            { name: "mtolfrey", fullName: "Michael Tolfrey" },
            { name: "nsaleem", fullName: "Nabeela Saleem" },
            { name: "rhowell", fullName: "Richard Howell" },
        ];
    }

    onFocus(event: FocusEvent): void {
        this.checkCurrentNode();
    }

    onClick(event: MouseEvent): void {
        this.checkCurrentNode();
    }

    onKeyDown(event: KeyboardEvent): void {
       
        if (this.atting) {
            if (event.key === " " || event.key === "Escape") {
                this.endMention();
                event.preventDefault();
                return;
            }

            // If the user presses enter and there is only one entry in 
            // the at list, select that
            if (event.key === 'Enter' || event.key === 'Tab') {
                if (this.atList.length == 1 || (this.atSelectedItem > -1 && this.atSelectedItem <= this.atList.length)) {
                    this.selectEntry(this.atList.length == 1 ? 0 : this.atSelectedItem);
                }
                event.preventDefault();
                return;
            }

            // If the user presses cursor up or down, 
            // move the atSelectedItem
            if(event.key === 'ArrowDown') {
                if (this.atSelectedItem + 1 < this.atList.length) {
                    this.atSelectedItem++;
                }
                event.preventDefault();
                return;
            }

            if (event.key === 'ArrowUp') {
                if (this.atSelectedItem > 0) {
                    this.atSelectedItem--;
                }
                event.preventDefault();
                return;
            }

            if(event.key === 'Backspace') {
                if(this.attingArray.length > 0) {
                    this.attingArray.pop();
                }
                // If length is now zero, should we remove the @ completely?
            } else {
                if(event.shiftKey || event.altKey || event.ctrlKey) {

                } else {
                    this.attingArray.push(event.key);
                }
            }

            // We're atting, so append to the current atting text
            // Is this the best way?
            this.attingText = this.attingArray.join('');
            
            this.filterFor(this.attingText);
            event.preventDefault();                    
        } else {
            // if(event.key === 'Enter') {
            //     const selection = window.getSelection();
            //     if (selection) {
            //         if (selection.focusNode?.hasChildNodes) {
            //             const node = selection.focusNode?.lastChild;
            //             console.log(`Lastchild: `, node);
            //             if(node?.nodeName.toLowerCase() === 'br') {
            //                 console.log(`Last element is a BR`);
            //             }
            //         }                
            //     }
            // }
        }
    }

    onKeyUp(event: KeyboardEvent): void {
        if(event.key === "@") {
            this.getAtStart();
        } else {           
            // this.checkCurrentNode();
            if(this.atting) return;
            
            this.checkCurrentNode();
            if (this.currentMentionNode) {
                if (event.key === 'Tab') {
                    // allow event propagation
                } else if (event.key === 'Backspace' || event.key === 'Delete') {
                    // We're on a mention node - we have to 
                    // remove it (and de-list it from the mentions list)                    

                    console.log(`Remove current node ${this.currentMentionNodeIndex}`);
                    const selection = window.getSelection();
                    if (selection) {
                        let node = selection.focusNode!;
                        this.deleteNode(node.parentNode);
                    }
                    // event.preventDefault();
                } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                    const currentNode = this.currentNodeType();
                    if (currentNode) {
                        if (event.key == 'ArrowRight') {
                            this.setPositionToNextNode(currentNode.nextSibling);
                        } else if (event.key == 'ArrowLeft') {
                            this.setPositionToPreviousNode(currentNode);
                        }
                        event.preventDefault();
                    }
                    // re-check!
                }
            }
            //this.checkCurrentNode();            
        }
    }

    setPositionToNextNode(node: ChildNode | null): void {       
        if (node) {
            const range = document.createRange();
            range.setStartBefore(node);
            range.setEndBefore(node);
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
                selection.collapseToEnd();
            }
        }
    }

    setPositionToPreviousNode(node: Node | ChildNode | null): void {
        if (node) {
            const range = document.createRange();
            range.setStartBefore(node);
            range.setEndBefore(node);
            //console.log(`node is`, node);
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
                selection.collapseToStart();
            }
        }
    }

    deleteNode(node: Node | ChildNode | null): void {       
        if(node){
            // console.log(`Got a node`, node);
            if (node.parentNode){
                // console.log(`Got a parent node`, node.parentNode);
                node.parentNode.removeChild(node);
            }
            this.cdr.detectChanges();
        }
    }

    checkCurrentNode(): void {
        if (window.getSelection()) {
            const n = this.currentNodeType();
            this.dom = '';
            if (n) {
                this.dom = this.sanitiser.sanitize(SecurityContext.URL,`${n.nodeName}:${n.textContent}`) ?? '';
                const el = n as HTMLElement;
                el.className = "mention-selected";

                const id = el.getAttribute('data-mention-id');
                if(id) {
                    // console.log(`Selected mention id is : ${id}, ${JSON.stringify(this.mentions[parseInt(id)])}`);
                    this.currentMentionNodeIndex = +id;
                }

                this.currentMentionNode = n;
            } else {
                if (this.currentMentionNode) {
                    const el = this.currentMentionNode as HTMLElement;
                    el.className = "mention";
                    this.currentMentionNode = undefined;
                }
            }
        }
    }

    currentMentionNode?: Node;
    currentMentionNodeIndex?: number;

    endMention(): void {
        this.atting = false;
        this.atResults = false;
        this.attingArray = [];
        this.attingText = '';
    }

    filterFor(t: string): void {
        const m = this.temp.filter( m => { return m.fullName.toLowerCase().includes(t.toLowerCase()) });
        if(m) {
            this.atResults = m.length > 0;
            this.$atList = of(m)
            this.$atList.subscribe({
                next: (c: CFMention[]) => {
                    this.atList = c;
                    if(this.atList.length >= this.atSelectedItem) {
                        this.atSelectedItem == -1;
                    }
                }
            });
        }
    }

    selectEntry(pos: number): void {
        console.log(`selectEntry: ${pos}`);
        //const textElement = this.textarea.nativeElement as HTMLTextAreaElement;
        if(pos<0 || pos>= this.atList.length) {
            console.log(`Out of bounds! ${pos}`);
        }
        const mention = this.atList[pos]
        const mentionName = mention.fullName;
        
        console.log(`Mention selected is: ${mentionName}`);

        // Okay, we have the item we want, we know
        // its start index and end index, so we 
        // must now update the textarea
        this.mentions.push(new CFMentionsInText(mention));

        var currentPosition = this.getCaretPosition();

        this.endMention();

        if (window.getSelection) {
            const selection = window.getSelection();
            if (selection) {
                const currentNode = selection.focusNode;
                if (currentNode) {
                    // const nextNode = currentNode.nextSibling;

                    const range = document.createRange();
                    
                    range.setStart(currentNode, this.atStart);
                    range.setEnd(currentNode, currentPosition);
                    range.deleteContents();

                    const spc = document.createTextNode(' ');
                    range.insertNode(spc);

                    const replacement = document.createElement("span");
                    replacement.className = "mention";
                    replacement.setAttribute('data-mention-id', `${this.mentions.length - 1}`);
                    replacement.textContent = `@${mentionName}`;
                    replacement.spellcheck = false;

                    range.insertNode(replacement);

                    range.setStartAfter(spc);
                    range.setEndAfter(spc);
                    
                    currentPosition = 1;
                    if (selection.focusNode) {
                        var next = selection.focusNode.lastChild;
                        try{
                            selection.setPosition(next, currentPosition) ;
                        }catch (error: any){
                            console.error(error);
                            selection.setPosition(selection.focusNode.firstChild,0);
                        }
                    }

                    selection.removeAllRanges();
                    selection.addRange(range);
                    selection.collapseToEnd();
                    this.cdr.detectChanges();
                }

            }
        }

    }

    currentNodeType(): Node | undefined {
        if (window.getSelection()) {
            const selection = window.getSelection();
            if (selection) {
                let node = selection.focusNode!;
                while (node) {
                    const el = node as Element;
                    if (el.className && el.className.startsWith('mention')) return node;
                    if (node.parentNode) {
                        node = node.parentNode;
                    } else {
                        return;
                    }
                }
            }
        }
        return;
    }

    private getAtStart() {
        this.atting = true;
        this.atList = [];
        this.atSelectedItem = -1;
        this.attingText = ''; // reset     
        
        if (window.getSelection) {
            const selection = window.getSelection();
            if (selection) {
                this.atCurrentNode = selection.focusNode!;
                this.atStart = selection.focusOffset - 1;
                
                // const el = selection.focusNode as HTMLElement;
            }
        }
    }

    private getCaretPosition() {
        let caretRevCount = 0;
        if (window.getSelection) {
            const selection = window.getSelection();
            if( selection ) {
                const currentNode = selection.focusNode?.parentNode;
                caretRevCount = selection.focusOffset;

                //console.log(`Current caretRevCount: ${caretRevCount}`, selection.focusNode?.parentNode);

                let previousNode = currentNode?.previousSibling;
                while (previousNode && previousNode.nodeName === 'DIV') {
                    // you can check specific element
                    caretRevCount += previousNode.textContent?.length ?? 0;
                    previousNode = previousNode.previousSibling;
                }
            }
        }
        return caretRevCount;
    }

    atting = false;
    atStart = -1;
    atNodeStart = -1;
    atSelectedItem = -1;
    atCurrentNode?: Node;
    atList: CFMention[] = [];
    $atList?: Observable<CFMention[]>;
    atResults = false;
    attingText = '';
    attingArray: string[] = [];
    temp: CFMention[] = [];
    mentions: CFMentionsInText[] = [];
}

export class CFMentionsInText {
    mention: CFMention;
    constructor(m: CFMention) {
        this.mention = m;
    }
}

export class CFMention {
    name: string;
    fullName: string;

    constructor(atName: string, name: string) {
        this.name = atName;
        this.fullName = name;
    }
}
