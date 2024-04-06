import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SecurityContext, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, filter, of } from 'rxjs';

@Component({
  selector: 'app-cf-mention-text',
  templateUrl: './cf-mention-text.component.html',
  styleUrls: ['./cf-mention-text.component.scss']
})
export class CfMentionTextComponent implements OnInit, OnChanges {
    @Input() text = '';
    @Input() searchData?: Observable<CFMention>;
    @ViewChild('mentiontext') textarea!: ElementRef;
    model = '';

    constructor(
        private cdr: ChangeDetectorRef,
        private sanitiser: DomSanitizer ){}

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes['text']) {
            //console.log(`Set text!`);
            this.model = changes['text'].currentValue;
        }
    }

    onFocus(event: FocusEvent): void {
        this.checkCurrentNode();
    }

    onClick(event: MouseEvent): void {
        this.checkCurrentNode();
    }

    onKeyDown(event: KeyboardEvent): void {
       
        if (this.atting) {
            switch(event.key) {
                case ' ':
                case 'Escape':
                    this.endMention();
                    event.preventDefault();
                    break;
                case 'Enter':
                case 'Tab':
                    if (this.atList.length == 1 || (this.atSelectedItem > -1 && this.atSelectedItem <= this.atList.length)) {
                        this.selectEntry(this.atList.length == 1 ? 0 : this.atSelectedItem);
                    }
                    event.preventDefault();
                    break;
                // If the user presses cursor up or down, 
                // move the atSelectedItem
                case 'ArrowDown':
                    if (this.atSelectedItem + 1 < this.atList.length) {
                        this.atSelectedItem++;
                    }
                    event.preventDefault();
                    break;
                case 'ArrowUp':
                    if (this.atSelectedItem > 0) {
                        this.atSelectedItem--;
                    }
                    event.preventDefault();
                    break;
                case 'Backspace':
                    if (this.attingArray.length > 0) {
                        this.attingArray.pop();
                    }
                    break;
                case 'ArrowLeft':
                case 'ArrowRight':
                    event.preventDefault();
                    break;
                default:
                    if (!(event.shiftKey || event.altKey || event.ctrlKey)) {
                        this.attingArray.push(event.key);
                    }    
                    // We're atting, so append to the current atting text
                    // Is this the best way?
                    this.attingText = this.attingArray.join('');
                    
                    this.filterFor(this.attingText);
                    //event.preventDefault();                    
                    break;
            }
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
            const element = node as HTMLElement;
            if(element.hasAttribute('contentEditable')) {
                // console.warn(`You've selected the top item!`);
                if(node.hasChildNodes()) {
                    for (var n = node.childNodes.length - 1; n >= 0; n--){
                        // console.log(`Removing: ${n}`, node.childNodes[n]);
                        node.removeChild(node.childNodes[n]);
                    }
                }
                //node.removeChild(node.firstChild!);
            } else {
                if (node.parentNode){
                    // console.log(`Got a parent node`, node.parentNode);
                    node.parentNode.removeChild(node);
                }
            }
            this.checkCurrentNode();
            this.cdr.detectChanges();
        }
    }

    checkCurrentNode(): void {
        if (window.getSelection()) {
            const n = this.currentNodeType();
            //this.dom = '';
            if (n) {
                // This is a new mention node, do we have
                // an existing one?
                if (this.currentMentionNode) {
                    const el = this.currentMentionNode as HTMLElement;
                    el.className = "mention";
                    this.currentMentionNode = undefined;
                }

                //this.dom = this.sanitiser.sanitize(SecurityContext.URL,`${n.nodeName}:${n.textContent}`) ?? '';
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

    endMention(): void {
        this.atting = false;
        this.atResults = false;
        this.attingArray = [];
        this.attingText = '';
    }

    filterFor(t: string): void {
        if(!this.searchData) return;
        this.atList = [];
        this.searchData
            .pipe(
                filter( (m: CFMention) => {
                    return m.fullName.toLowerCase().includes(t.toLowerCase());
                })
            )
            .subscribe({
                next: (r: CFMention) => {
                    // console.log(`Got ${JSON.stringify(r)}`);
                    this.atList.push(r);
                },
                error: (error: any)=> {},
                complete: () => { 
                    // console.log(`complete: ${this.atList.length}`);
                    this.atResults = this.atList.length > 0;
                    if (this.atList.length >= this.atSelectedItem) {
                        this.atSelectedItem = -1;
                    }
                }
            });
    }

    selectEntry(pos: number): void {
        //console.log(`selectEntry: ${pos}`);
        //const textElement = this.textarea.nativeElement as HTMLTextAreaElement;
        if(pos<0 || pos>= this.atList.length) {
            console.log(`Out of bounds! ${pos}`);
        }
        const mention = this.atList[pos]
        const mentionName = mention.fullName;
        
        //console.log(`Mention selected is: ${mentionName}`);

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
                    selection.removeAllRanges();

                    const range = document.createRange();
                    
                    range.setStart(currentNode, this.atStart);
                    range.setEnd(currentNode, currentPosition);
                    range.deleteContents();

                    const spc = document.createTextNode('  ');
                    range.insertNode(spc);

                    const replacement = document.createElement("span");
                    replacement.className = "mention";
                    replacement.setAttribute('data-mention-id', `${this.mentions.length - 1}`);
                    replacement.setAttribute('spellcheck', `false`);
                    replacement.textContent = `@${mentionName}`;
                    replacement.spellcheck = false;

                    range.insertNode(replacement);
                   
                    range.setStartAfter(spc);
                    range.setEndAfter(spc);
                    selection.addRange(range);

                    selection.collapseToEnd();

                    //this.cdr.detectChanges();
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

    currentMentionNode?: Node;
    currentMentionNodeIndex?: number;

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
